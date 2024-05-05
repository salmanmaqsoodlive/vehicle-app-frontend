import { Field, Form, Formik } from "formik";
import CustomButton from "../../components/@global/CustomButton";
import CustomCard from "../../components/@global/CustomCard";
import CustomModal from "../../components/@global/CustomModal";
import CustomTextField from "../../components/@global/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import useApi from "../../utils/hooks/useApi";
import { useEffect, useState } from "react";

const AddCarSchema = Yup.object().shape({
  model: Yup.string().required("Model is required"),
  color: Yup.string().required("Color is required"),
  make: Yup.number().required("Make is required"),
  registrationNumber: Yup.string().required("Registration number is required"),
  categoryId: Yup.string().required("Please select category"),
});

const resetValues = {
  model: "",
  color: "",
  make: null,
  registrationNumber: "",
  categoryId: "",
};

export default function AddCarModal({
  open,
  setOpen,
  fetchCars,
  editCar,
  mode,
}) {
  const { loading, error, get, post, put } = useApi();
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState(resetValues);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      setInitialValues({
        model: editCar.model,
        color: editCar.color,
        make: editCar.make,
        registrationNumber: editCar.registrationNumber,
        categoryId: editCar.category?._id,
      });
      console.log("edi", editCar);
    } else {
      setInitialValues(resetValues);
    }
  }, [editCar, mode]);

  const fetchAllCategories = async () => {
    const res = await get("/vehicleCategory");
    setCategories(res);
  };

  const handleAddEditCar = async (data) => {
    try {
      if (mode === "add") {
        await post("/vehicle", data);
      } else {
        console.log("edi", editCar);
        await put(`/vehicle/${editCar._id}`, data);
      }
      fetchCars();
      setOpen(false);
    } catch (error) {}
  };

  console.log("initialValues", initialValues);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <CustomCard>
        <h1 className="mb-5 text-5xl">Register Car</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={AddCarSchema}
          onSubmit={handleAddEditCar}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="model">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField name="model" label="Model" {...field} />
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="make">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField name="make" label="Make" {...field} />
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="registrationNumber">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField
                      name="registrationNumber"
                      label="Registration Number"
                      {...field}
                    />
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="color">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField
                      name="color"
                      label="Select Color"
                      {...field}
                      type="color"
                    />
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="categoryId">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <Select
                      {...field}
                      id="category"
                      name="categoryId"
                      variant="outlined"
                      fullWidth
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id}>
                          {category.type}
                        </MenuItem>
                      ))}
                    </Select>
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <CustomButton type="submit" fullWidth variant="contained">
                Add
              </CustomButton>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </CustomModal>
  );
}
