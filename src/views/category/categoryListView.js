import { useEffect, useState } from "react";
import CustomDataTable from "../../components/@global/CustomDataTable";
import useApi from "../../utils/hooks/useApi";
import { logout } from "../../redux/authReducer";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/@global/CustomButton";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "./addCategoryModal";
import EditCategoryModal from "./editCategoryModal";
import ViewCategoryDetails from "./viewCategoryDetails";
import Loader from "../../components/@global/Loader";
import { addToast } from "../../redux/toastReducer";

export default function CategoryListView() {
  const { loading, error, get, remove } = useApi();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await get("/vehicleCategory");
      setData(res);
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  const handleEdit = (car) => {
    setSelectedCategory(car);
    setOpenEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove(`/vehicleCategory/${id}`);
      const filteredData = data.filter((car) => car._id !== id);
      setData(filteredData);
      dispatch(
        addToast({ message: "Deleted Successfully!!", type: "success" })
      );
    } catch (error) {
      dispatch(
        addToast({ message: error.response.data.message, type: "error" })
      );
    }
  };
  const handleViewDetails = (data) => {
    setSelectedCategory(data);
    setOpenViewDetailsModal(true);
  };

  const columns = [
    { field: "type", headerName: "Type", width: 300 },
    { field: "description", headerName: "Description", width: 300 },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex">
            <div
              className="mr-5 cursor-pointer"
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <div
              className="ml-5 cursor-pointer"
              onClick={() => handleViewDetails(params.row)}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-5">
      {loading && <Loader />}
      <div className="flex justify-end mb-5">
        <CustomButton
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Category
        </CustomButton>
      </div>
      <CustomDataTable rows={data} columns={columns} />

      {open && (
        <AddCategoryModal
          open={open}
          setOpen={setOpen}
          fetchCategories={fetchCategories}
        />
      )}
      {openEditModal && (
        <EditCategoryModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          fetchCategories={fetchCategories}
          editCategory={selectedCategory}
        />
      )}
      {openViewDetailsModal && (
        <ViewCategoryDetails
          open={openViewDetailsModal}
          setOpen={setOpenViewDetailsModal}
          data={selectedCategory}
        />
      )}
    </div>
  );
}
