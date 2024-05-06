import { Field, Form, Formik } from "formik";
import CustomButton from "../../components/@global/CustomButton";
import CustomCard from "../../components/@global/CustomCard";
import CustomModal from "../../components/@global/CustomModal";
import CustomTextField from "../../components/@global/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import useApi from "../../utils/hooks/useApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/@global/Loader";
import { addToast } from "../../redux/toastReducer";

const AddCarSchema = Yup.object().shape({
  model: Yup.string().required("Model is required"),
  color: Yup.string().required("Color is required"),
  make: Yup.number().required("Make is required"),
  registrationNumber: Yup.string().required("Registration number is required"),
  categoryId: Yup.string().required("Please select category"),
});

export default function EditCarModal({
  open,
  setOpen,
  fetchCars,
  editCar,
  categories,
}) {
  const { loading, error, put } = useApi();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    model: editCar.model,
    color: editCar.color,
    make: editCar.make,
    registrationNumber: editCar.registrationNumber,
    categoryId: editCar.category?._id,
  });

  const handleEditCar = async (data) => {
    try {
      await put(`/vehicle/${editCar._id}`, data);
      fetchCars();
      setOpen(false);
      dispatch(addToast({ message: "Updated Successfully", type: "success" }));
    } catch (error) {
      dispatch(
        addToast({ message: error.response.data.message, type: "error" })
      );
    }
  };
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <CustomCard>
        {loading && <Loader />}
        <h1 className="mb-5 text-5xl">Edit Car</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={AddCarSchema}
          onSubmit={handleEditCar}
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
                Update
              </CustomButton>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </CustomModal>
  );
}
