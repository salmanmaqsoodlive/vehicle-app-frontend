import * as React from "react";

import CustomButton from "../../components/@global/CustomButton";
import CustomCard from "../../components/@global/CustomCard";
import CustomTextField from "../../components/@global/CustomTextField";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useApi from "../../utils/hooks/useApi";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Full Name is required"),
});

export default function Signup() {
  const { loading, error, post } = useApi();

  const handleSignup = async (data) => {
    try {
      const res = await post("/signup", data);
      console.log("res ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomCard>
      <h1 className="mb-5 text-5xl">Signup</h1>

      <Formik
        initialValues={{
          email: "",
          name: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="mb-5">
                  <CustomTextField
                    name="name"
                    label="Full Name"
                    type="text"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="text-left text-red-600">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="email">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="mb-5">
                  <CustomTextField
                    name="email"
                    label="Email"
                    type="email"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="text-left text-red-600">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <CustomButton type="submit" fullWidth variant="contained">
              Signup
            </CustomButton>
          </Form>
        )}
      </Formik>

      <p className="mt-5">
        Already have an account?
        <span className="text-blue-600">
          <Link to="/login"> Login</Link>
        </span>
      </p>
    </CustomCard>
  );
}
