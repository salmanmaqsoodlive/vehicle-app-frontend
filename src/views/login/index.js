import * as React from "react";

import CustomButton from "../../components/@global/CustomButton";
import CustomCard from "../../components/@global/CustomCard";
import CustomTextField from "../../components/@global/CustomTextField";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useApi from "../../utils/hooks/useApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long"
    )
    .required("Password is required"),
});

export default function Login() {
  const { loading, error, post } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const res = await post("/login", data);
      dispatch(setUser(res));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CustomCard>
      <h1 className="mb-5 text-5xl">Login</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
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

            <Field name="password">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="mb-5">
                  <CustomTextField
                    name="password"
                    label="Password"
                    type="password"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="text-left text-red-600">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <CustomButton type="submit" fullWidth variant="contained">
              Login
            </CustomButton>
          </Form>
        )}
      </Formik>

      <p className="mt-5">
        New here?
        <span className="text-blue-600">
          <Link to="/signup"> Signup</Link>
        </span>
      </p>
    </CustomCard>
  );
}
