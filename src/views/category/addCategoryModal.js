import { Field, Form, Formik } from "formik";
import CustomButton from "../../components/@global/CustomButton";
import CustomCard from "../../components/@global/CustomCard";
import CustomModal from "../../components/@global/CustomModal";
import CustomTextField from "../../components/@global/CustomTextField";
import * as Yup from "yup";
import useApi from "../../utils/hooks/useApi";
import Loader from "../../components/@global/Loader";
import { addToast } from "../../redux/toastReducer";
import { useDispatch } from "react-redux";

const AddCategorySchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  description: Yup.string(),
});

export default function AddCategoryModal({ open, setOpen, fetchCategories }) {
  const dispatch = useDispatch();
  const { loading, error, get, post } = useApi();

  const handleAddCategory = async (data) => {
    try {
      await post("/vehicleCategory", data);

      fetchCategories();
      setOpen(false);
      dispatch(
        addToast({ message: "Category added successfully", type: "success" })
      );
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
        <h1 className="mb-5 text-5xl">Add Category</h1>

        <Formik
          initialValues={{
            type: "",
            description: "",
          }}
          validationSchema={AddCategorySchema}
          onSubmit={handleAddCategory}
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
                Add
              </CustomButton>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </CustomModal>
  );
}
