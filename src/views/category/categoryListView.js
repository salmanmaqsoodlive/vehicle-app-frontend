import { useEffect, useState } from "react";
import CustomDataTable from "../../components/@global/CustomDataTable";
import useApi from "../../utils/hooks/useApi";
import { logout } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/@global/CustomButton";
import { setCategories } from "../../redux/categoryReducer";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "./addCategoryModal";
import EditCategoryModal from "./editCategoryModal";
import ViewCategoryDetails from "./viewCategoryDetails";

export default function CategoryListView() {
  const { loading, error, get, remove } = useApi();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});
  const categories = useSelector((state) => state.categoryReducer.value);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    const res = await get("/vehicleCategory");
    dispatch(setCategories({ categories: res }));
  };

  const fetchCars = async () => {
    try {
      const res = await get("/vehicle");
      setData(res);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
        dispatch(logout());
      }
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setOpenEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove(`/vehicle/${id}`);
      const filteredData = data.filter((car) => car._id !== id);
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewDetails = (data) => {
    setSelectedCar(data);
    setOpenViewDetailsModal(true);
  };

  const columns = [
    { field: "model", headerName: "Model", width: 300 },
    { field: "make", headerName: "Make", width: 300 },
    {
      field: "color",
      headerName: "Color",
      width: 300,
      renderCell: (params) => {
        return (
          <div
            style={{
              backgroundColor: params.row.color.toString(),
              height: "20px",
              width: "20px",
            }}
            className="rounded-full mt-2"
          />
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 300,
      renderCell: (params) => {
        return <p>{params.row.category.type}</p>;
      },
    },
    {
      field: "registrationNumber",
      headerName: "Registration",
      width: 300,
    },
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
      <div className="flex justify-end mb-5">
        <CustomButton
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Car
        </CustomButton>
      </div>
      <CustomDataTable rows={data} columns={columns} />

      {open && (
        <AddCategoryModal
          open={open}
          setOpen={setOpen}
          fetchCars={fetchCars}
          categories={categories.categories}
        />
      )}
      {openEditModal && (
        <EditCategoryModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          fetchCars={fetchCars}
          editCar={selectedCar}
          categories={categories.categories}
        />
      )}
      {openViewDetailsModal && (
        <ViewCategoryDetails
          open={openViewDetailsModal}
          setOpen={setOpenViewDetailsModal}
          data={selectedCar}
        />
      )}
    </div>
  );
}
