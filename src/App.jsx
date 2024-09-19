import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const App = () => {
  const [errorsVisible, setErrorsVisible] = useState({ name: false, email: false, password: false, confirmPassword: false });

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .oneOf(["rishiME@199"], "Password must be 'rishiME@199'")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false, 
    validateOnChange: false, 
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      setErrorsVisible({ name: false, email: false, password: false, confirmPassword: false });
      setTimeout(() => {
        const errors = validationSchema.validateSync(values, { abortEarly: false }).errors;
        if (errors.name) {
          setErrorsVisible(prev => ({ ...prev, name: true }));
        }
        if (errors.email) {
          setErrorsVisible(prev => ({ ...prev, email: true }));
        }
        if (errors.password) {
          setErrorsVisible(prev => ({ ...prev, password: true }));
        }
        if (errors.confirmPassword) {
          setErrorsVisible(prev => ({ ...prev, confirmPassword: true }));
        }
      }, 1000);
    },
  });

  return (
    <div className="App">
      <div className="image-container">
        <img
          src="https://m.foolcdn.com/media/dubs/images/smiling_man_in_business_suit_at_laptop_GettyIma.original.jpg"
          alt="Professional Computer"
        />
      </div>
      <h1>Email Validation Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && errorsVisible.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && errorsVisible.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && errorsVisible.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && errorsVisible.confirmPassword && formik.errors.confirmPassword ? (
            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
