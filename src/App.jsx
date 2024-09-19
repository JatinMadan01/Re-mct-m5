import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const App = () => {
  // State to handle delayed error messages
  const [errorsVisible, setErrorsVisible] = useState({ email: false, password: false });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .oneOf(["rishiME@199"], "Password must be 'rishiME@199'")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false, // Prevent validation on blur to handle manually
    validateOnChange: false, // Prevent validation on change to handle manually
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      setErrorsVisible({ email: false, password: false }); // Reset visibility
      setTimeout(() => {
        // Delay error display by 3 seconds
        const errors = validationSchema.validateSync(values, { abortEarly: false }).errors;
        if (errors.email) {
          setErrorsVisible(prev => ({ ...prev, email: true }));
        }
        if (errors.password) {
          setErrorsVisible(prev => ({ ...prev, password: true }));
        }
      }, 3000);
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

        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
