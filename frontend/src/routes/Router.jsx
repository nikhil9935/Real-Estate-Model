import { lazy} from 'react';
import { BrowserRouter, Routes, Route } from '../components/Routers'
const Login = lazy(() => import('../modules/users/Login/Login'));
const SignUp = lazy(() => import('../modules/users/SignUp/SignUp'));
const Create = lazy(() => import('../modules/listings/Create'));
const BulkUpload = lazy(() => import('../modules/listings/BulkUpload'));
const ViewPropertyDetails = lazy(() => import('../modules/listings/ViewPropertyDetails'));
const EditProperty = lazy(() => import('../modules/listings/EditProperty'));
const ViewProperty = lazy(() => import('../modules/listings/ViewProperty'));
const BulkErrorDetail = lazy(() => import('../modules/listings/BulkErrorDetail'));
const UploadFile = lazy(() => import('../modules/listings/UploadFile'));
const Navbar = lazy(() => import('../modules/Layout/Layout'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const Protected = lazy(() => import('../pages/Protected'));
const UnauthorizedPage = lazy(() => import('../pages/Unauthorized'));

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Protected />}>
          <Route path="navbar" element={<Navbar />} />
          <Route path="create" element={<Create />} />
          <Route path="/bulk-uploads" element={<BulkUpload />} />
          <Route path="/uploadcsv" element={<UploadFile />} />
          <Route path="/bulk-uploads/:upload_id" element={<BulkErrorDetail />} />
          <Route path="view-property" element={<ViewProperty />} />
          <Route path="/view-property/:id" element={<ViewPropertyDetails />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};



