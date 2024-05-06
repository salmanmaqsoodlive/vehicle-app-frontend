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
import Loader from "../../components/@global/Loader";
import { addToast } from "../../redux/toastReducer";
import { useDispatch } from "react-redux";

const AddCategorySchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  description: Yup.string(),
});

export default function EditCategoryModal({
  open,
  setOpen,
  fetchCategories,
  editCategory,
}) {
  const { loading, error, put } = useApi();
  const [initialValues, setInitialValues] = useState({
    type: editCategory.type,
    description: editCategory.description,
  });
  const dispatch = useDispatch();
  const handleEditCategory = async (data) => {
    try {
      await put(`/vehicleCategory/${editCategory._id}`, data);
      fetchCategories();
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
        <h1 className="mb-5 text-5xl">Edit Category</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={AddCategorySchema}
          onSubmit={handleEditCategory}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="type">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField name="type" label="Type" {...field} />
                    {meta.touched && meta.error && (
                      <div className="text-left text-red-600">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="description">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="mb-5">
                    <CustomTextField
                      name="description"
                      label="Description"
                      {...field}
                    />
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
