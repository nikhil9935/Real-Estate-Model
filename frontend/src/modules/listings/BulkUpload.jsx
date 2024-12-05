import { useEffect, useState } from "../../components/Hooks";
import { useNavigate } from "../../components/Routers";
import SpinLoader from "../../components/Spinner";
import ViewErrorsButton from "../../components/ViewErrorButton";
import BulkUploadTable from "../../components/BulkUploadTable";
import CreateAxiosInstance from "../../components/AxiosInterceptor";

const BulkUpload = () => {
  const apiInstance = CreateAxiosInstance();
  const [bulkUploads, setBulkUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewBulkUploadErrors = (upload_id) => {
    navigate(`/bulk-uploads/${upload_id}`);
  };

  const fetchApiResponse = async () => {
    try {
      const apiResponse = await apiInstance.get(`/listing/bulk-uploads-list`)
      setBulkUploads(apiResponse.data);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized')
      }
      console.error("Error fetching bulk uploads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiResponse();
  }, []);

  if (loading) {
    return <SpinLoader size="large" />;
  }

  const columns = [
    {
      title: "Records Processed",
      dataIndex: "recordsProcessed",
      key: "recordsProcessed",
    },
    {
      title: "Errors",
      dataIndex: "totalErrors",
      key: "totalErrors",
    },
    {
      title: "Time Taken (seconds)",
      dataIndex: "timeTaken",
      key: "timeTaken",
    },
    {
      title: "Uploaded At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Upload Id",
      dataIndex: "upload_id",
      key: "upload_id",
    },
    {
      title: "View Errors",
      key: "actions",
      render: (text, record) => (
        <ViewErrorsButton onClick={() => handleViewBulkUploadErrors(record.upload_id)} />
      ),
    },
  ];

  return <BulkUploadTable dataSource={bulkUploads} columns={columns} />;
};

export default BulkUpload;

