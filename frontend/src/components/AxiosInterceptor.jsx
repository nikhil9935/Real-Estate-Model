// import axios from 'axios';
// import { useNavigate } from './Routers';

// const CreateAxiosInstance = () => {
//   console.log('jwtToken',localStorage.getItem('jwtToken'))
//   console.log("i call")
//   console.log('jwtToken',localStorage.getItem('jwtToken'))
//   const navigate = useNavigate();

//   const instance = axios.create();
//   instance.interceptors.request.use(
//     (config) => {
//       console.log("INterceptor req")
//       const token=localStorage.getItem('jwtToken')
//       if (localStorage.getItem('jwtToken')) {
//         config.headers.Authorization = `${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 403 || error.response.status === 401) {
//         console.log("s")
//         localStorage.removeItem('jwtToken');
//         navigate('/unauthorized');
//       }
//       return Promise.resolve(error.response);
//     }
//   );

//   return instance;
// };

// export default CreateAxiosInstance;
import axios from 'axios';
import { useNavigate } from './Routers';

const CreateAxiosInstance = () => {
  const navigate = useNavigate();

  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      console.log("Interceptor request");
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        console.log("Unauthorized access detected");
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance;
