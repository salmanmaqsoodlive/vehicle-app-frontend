import { useEffect, useState } from "react";
import CustomDataTable from "../../components/@global/CustomDataTable";
import useApi from "../../utils/hooks/useApi";
import { logout } from "../../redux/authReducer";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/@global/CustomButton";
import AddCarModal from "./addCarModal";

export default function CarListView() {
  const { loading, error, get } = useApi();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCar, setEditCar] = useState({});
  const [mode, setMode] = useState("add");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await get("/vehicle");
      setData(res);
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
    }
  };

  const handleEdit = (car) => {
    setEditCar(car);
    setOpen(true);
    setMode("edit");
  };

  const handleDelete = (id) => {
    console.log("delete ", id);
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
            setMode("add");
          }}
        >
          Add Car
        </CustomButton>
      </div>
      <CustomDataTable rows={data} columns={columns} />

      <AddCarModal
        open={open}
        setOpen={setOpen}
        fetchCars={fetchCars}
        editCar={editCar}
        mode={mode}
      />
    </div>
  );
}
