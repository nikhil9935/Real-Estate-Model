import { useEffect, useState } from '../../components/Hooks';
import { useNavigate, useParams } from '../../components/Routers';
import MyLayout from '../Layout/Layout';
import { PropertyImage, PropertyInfo, PropertyDetails } from '../../components/ViewProperty';
import SpinLoader from '../../components/Spinner';
import CustomMessage from '../../components/CustomMessage';
import CreateAxiosInstance from '../../components/AxiosInterceptor';


const ViewPropertyDetails = () => {
  const apiInstance = CreateAxiosInstance();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/listing/listings/${id}`)


        setPropertyDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem('jwtToken');
          navigate('/unauthorized');
        }
        if (error.response.status === 404 || error.response.status === 500){
        console.log("Details")
        CustomMessage.error("No Properties Details Found")
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <MyLayout>
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        {loading ? (
          <SpinLoader size="large" />
        ) : propertyDetails ? (
          <div>
            <PropertyImage src={propertyDetails.image} />
            <div style={{ padding: '20px', boxSizing: 'border-box' }}>
              <PropertyInfo details={propertyDetails} />
              {propertyDetails.details && <PropertyDetails details={propertyDetails.details} />}
            </div>
          </div>
        ) : null}
      </div>
    </MyLayout>
  );
};

export default ViewPropertyDetails;
