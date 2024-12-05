import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "../../../components/Routers";
import SignUpCard from "../../../components/SignUpCard";
import CustomMessage from "../../../components/CustomMessage";

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Please input your username!')
        .min(3, 'Username must be at least 3 characters long'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Please input your email!'),
      password: Yup.string()
        .required('Please input your password!')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
          'Password must contain at least one letter, one number, and one special character'
        ),
      phone: Yup.string()
        .required('Please input your contact number!')
        .matches(/^[0-9]+$/, 'Phone number must only contain digits')
        .min(10, 'Phone number must be at least 10 digits long')
        .max(15, 'Phone number cannot exceed 15 digits'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/user/register', values);
        CustomMessage.success('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        if (error.response && error.response.status === 400) {
          CustomMessage.error(
            'User with the same username or email already exists. Please choose a different username or email.'
          );
        } else {
          CustomMessage.error('Registration failed. Please try again');
        }
      }
    },
  });

  return <SignUpCard formik={formik} navigate={navigate} />;
};

export default SignUp;
