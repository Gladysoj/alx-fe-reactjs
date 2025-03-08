import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup with explicit "string().required"
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required') // Explicitly using string().required
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string().required('Email is required') // Explicitly using string().required
    .email('Invalid email address'),
  password: Yup.string().required('Password is required') // Explicitly using string().required
    .min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    // Add your submission logic here
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <h2>Registration Form (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field 
                type="text" 
                name="username" 
                id="username"
              />
              <ErrorMessage 
                name="username" 
                component="span" 
                style={{ color: 'red' }} 
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                name="email" 
                id="email"
              />
              <ErrorMessage 
                name="email" 
                component="span" 
                style={{ color: 'red' }} 
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field 
                type="password" 
                name="password" 
                id="password"
              />
              <ErrorMessage 
                name="password" 
                component="span" 
                style={{ color: 'red' }} 
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
