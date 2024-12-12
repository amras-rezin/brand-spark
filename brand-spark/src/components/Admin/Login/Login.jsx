import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { FaSpinner } from 'react-icons/fa';
import { axiosAdmin } from '../../../axios/axiosAdmin';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../redux/slices/adminSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const { data } = await axiosAdmin().post('/login', { email, password });
      if (data.message === 'Success') {
        setTimeout(()=>{
          setLoading(false);
          localStorage.setItem('adminToken', data.token);
          dispatch(adminLogin({ name: data.name, loggedIn: true }));
          toast.success('Admin Logged in Successfully');
          navigate('/admin/dashboard')
        },1000)
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during login:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient text-white">
      <div className="max-w-lg w-full mx-auto my-5 p-8 rounded-md shadow-lg shadow-gray-800 transition-all duration-500 ease-in-out transform hover:scale-95 hover:shadow-none">
        <div className="flex justify-center">
          <img className="w-20 h-20" src="/logo.png" alt="" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-200">
          Admin Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Email:
              </label>
              <Field
                type="text"
                name="email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-white"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Password:
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-white"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-center">
              <button type="submit" className="relative">
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text flex justify-center items-center">
                  {' '}
                  {loading && <FaSpinner className="animate-spin mr-2" />}Submit
                </span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
