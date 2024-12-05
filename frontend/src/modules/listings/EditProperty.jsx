import { useEffect, useState } from '../../components/Hooks';
import { useParams, useNavigate, Navigate } from '../../components/Routers';
import { Input, Switch, Button, Upload } from '../../components/AntdComponents';
import MyLayout from '../Layout/Layout';
import ButtonAtom from '../../components/Buttons';
import CreateAxiosInstance from '../../components/AxiosInterceptor';
const EditProperty = () => {
  const apiInstance = CreateAxiosInstance();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    address: '',
    details: {
      bedrooms: 0,
      bathrooms: 0,
      areaSquareFeet: 0,
      isFurnished: false,
      hasGarage: false,
      isPetsAllowed: false,
      agentName: '',
      contactEmail: '',
      contactPhone: '',
      hasSwimmingPool: false,
      isSecurityEnabled: false,
      isGatedCommunity: false,
      hasGarden: false,
      constructionYear: 0,
      energyEfficiencyRating: '',
    },
    file: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/listing/listings/${id}`)

        setFormData(response.data);
        console.log(formData)
      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem('jwtToken');
          navigate('/unauthorized');
        }
        console.error('Error fetching property details:', error);
      }
    };
    fetchData();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => {
      if (name.startsWith('details.')) {
        const details = { ...prevData.details, [name.split('.')[1]]: type === 'checkbox' ? checked : value };
        return { ...prevData, details };
      }
      return { ...prevData, [name]: type === 'checkbox' ? checked : files ? files[0] : type === 'number' ? parseFloat(value) || 0 : value };
    });
  };
  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('details', JSON.stringify(formData.details));
      formDataToSend.append('file', formData.file);
      console.log('Final FormData:', formDataToSend);
      await apiInstance.put(`/listing/listings/${id}`, formDataToSend)
      console.log('Property details updated successfully!');
      navigate(`/view-property/${id}`);
    } catch (error) {
      console.error('Error updating property details:', error);
    }
  };
  return (
    <MyLayout>
      <div>
        <h1>Edit Property</h1>
        <form>
          <label>
            Title:
            <Input
              type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <br></br>
          <br></br>
          <label>
            Description:
            <Input.TextArea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Price:
            <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Address:
            <Input type="text" name="address" value={formData.address} onChange={handleInputChange} />
          </label>    <br></br>    <br></br>
          <h2>Property Details</h2>
          <label>
            Bedrooms:
            <Input type="number" name="details.bedrooms" value={formData.details.bedrooms} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Bathrooms:
            <Input type="number" name="details.bathrooms" value={formData.details.bathrooms} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Area (Square Feet):
            <Input type="number" name="details.areaSquareFeet" value={formData.details.areaSquareFeet} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Furnished:
            <Switch
              name="details.isFurnished"
              checked={formData.details.isFurnished}
              onChange={(checked) => handleInputChange({ target: { name: 'details.isFurnished', type: 'checkbox', checked } })}
            >
              Is Furnished
            </Switch>
          </label>
          {"   "} {" "}
          <label>
            Has Garage:
            <Switch
              name="details.hasGarage"
              checked={formData.details.hasGarage}
              onChange={(checked) => handleInputChange({ target: { name: 'details.hasGarage', type: 'checkbox', checked } })}
            >
              Has Garage
            </Switch>
          </label>
          {" "} {" "}
          <label>
            Pets Allowed:
            <Switch
              name="details.isPetsAllowed"
              checked={formData.details.isPetsAllowed}
              onChange={(checked) => handleInputChange({ target: { name: 'details.isPetsAllowed', type: 'checkbox', checked } })}
            >
              Pets Allowed
            </Switch>
          </label>
          <br></br>    <br></br>
          <label>
            Agent Name:
            <Input name="details.agentName" value={formData.details.agentName} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Contact Email:
            <Input name="details.contactEmail" value={formData.details.contactEmail} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Contact Phone:
            <Input name="details.contactPhone" value={formData.details.contactPhone} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <label>
            Has Swimming Pool:
            <Switch
              name="details.hasSwimmingPool"
              checked={formData.details.hasSwimmingPool}
              onChange={(checked) => handleInputChange({ target: { name: 'details.hasSwimmingPool', type: 'checkbox', checked } })}
            >
              Has Swimming Pool
            </Switch>
          </label>
          {" "} {" "}
          <label>
            Is Security Enabled:
            <Switch
              name="details.isSecurityEnabled"
              checked={formData.details.isSecurityEnabled}
              onChange={(checked) => handleInputChange({ target: { name: 'details.isSecurityEnabled', type: 'checkbox', checked } })}
            >
              Is Security Enabled
            </Switch>
          </label>
          {" "} {" "}
          <label>
            Is Gated Community:
            <Switch
              name="details.isGatedCommunity"
              checked={formData.details.isGatedCommunity}
              onChange={(checked) => handleInputChange({ target: { name: 'details.isGatedCommunity', type: 'checkbox', checked } })}
            >
              Is Gated Community
            </Switch>
          </label>
          {" "} {" "}
          <label>
            Has Garden:
            <Switch
              name="details.hasGarden"
              checked={formData.details.isGatedCommunity}
              onChange={(checked) => handleInputChange({ target: { name: 'details.hasGarden', type: 'checkbox', checked } })}
            >
              Is Gated Community
            </Switch>
          </label>
          <br></br>    <br></br>
          <label>
            Construction Year:
            <Input name="details.constructionYear" value={formData.details.constructionYear} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>


          <label>
            Energy Efficiency Rating:
            <Input type="text" name="details.energyEfficiencyRating" value={formData.details.energyEfficiencyRating} onChange={handleInputChange} />
          </label>
          <br></br>    <br></br>
          <ButtonAtom type="primary" onClick={handleUpdate}>
            Update Property
          </ButtonAtom>
        </form>
      </div>
    </MyLayout>
  );
};
export default EditProperty;
