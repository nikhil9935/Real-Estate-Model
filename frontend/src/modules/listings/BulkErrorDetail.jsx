import { useEffect, useState } from "../../components/Hooks";
import { useParams, useNavigate } from "../../components/Routers";
import CreateAxiosInstance from '../../components/AxiosInterceptor';
import BulkErrorContainer from "../../components/BulkErrorContainer";

const BulkErrorDetail = () => {
  const apiInstance = CreateAxiosInstance();
  const navigate = useNavigate();
  const { upload_id } = useParams();
  const [bulkErrors, setBulkErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleApiResponse = async () => {
    console.log("Going to fetch error details")
    try {
      const apiResponse = await apiInstance.get(
        `/listing/bulk-uploads-errors/${upload_id}`)
     console.log("token",localStorage.getItem('jwtToken'))
      console.log("Details fetched successfully")
      setBulkErrors(apiResponse.data);
      console.log(bulkErrors)
      setLoading(false);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized')
      }
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    handleApiResponse();
  }, [upload_id]);
  const columns = [
    {
      title: "Row Number",
      dataIndex: "rowNumber",
      key: "rowNumber",
    },
    {
      title: "Error Details",
      dataIndex: "errorDetails",
      key: "errorDetails",
    },
  ];

  return (
    <BulkErrorContainer loading={loading} bulkErrors={bulkErrors} columns={columns} />
  );
};

export default BulkErrorDetail;