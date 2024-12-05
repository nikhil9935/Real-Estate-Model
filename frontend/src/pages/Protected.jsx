import { Outlet, Navigate } from '../components/Routers';
const PrivateRoutes = () => {
  const isUserAuthenticated = localStorage.getItem('jwtToken');
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;