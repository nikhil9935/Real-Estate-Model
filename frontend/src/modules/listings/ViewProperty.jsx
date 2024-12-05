import { useEffect, useState } from '../../components/Hooks';
import { useNavigate } from '../../components/Routers';
import { Input, Space, Select } from '../../components/AntdComponents';
import MyLayout from '../Layout/Layout'
import ButtonAtom from '../../components/Buttons';
import CustomMessage from '../../components/CustomMessage';
import { PropertyList } from '../../components/PropertyList';
import CreateAxiosInstance from '../../components/AxiosInterceptor';


const { Option } = Select;

const ViewProperty = () => {
  const apiInstance = CreateAxiosInstance();
  const [propertyList, setPropertyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrderByPrice, setSortOrderByPrice] = useState('desc');
  const [totalProperties, setTotalProperties] = useState(0);
  const [page, setPage] = useState(1);
  const limitPerPage = 6;
  const navigate = useNavigate();
  const handleCreateProperty = () => {
    navigate('/create');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm == '') {
        CustomMessage.error('Please enter Title or Address or Description to search')
        return
      }
      fetchData();
    }
  };
  const handleButtonClick = () => {
    if (!searchTerm) {
      CustomMessage.error('Please enter Title or Address or Description to search')
      return
    }
    fetchData()
  }
  const handleBulkUpload = () => {
    navigate('/uploadcsv');
  };

  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("api hit")
      let response;
      if (searchTerm.trim() === '') {
        response = await apiInstance.get('/listing/listings/', {
          params: {
            skip: (page - 1) * limitPerPage,
            limit: limitPerPage,
            sortOrderByPrice: sortOrderByPrice,
          },

        });
      } else {
        response = await apiInstance.get(`/listing/listings/search/${searchTerm}`, {
          params: {
            skip: (page - 1) * limitPerPage,
            limit: limitPerPage,
            sortOrderByPrice: sortOrderByPrice,
          },

        });
      }
      console.log(response.status)
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized')
      }
      setPropertyList(response.data);
      console.log(response.data)
      setTotalProperties(response.headers['x-total-count']);
    } catch (error) {
      if (error.response.status === 403) {
        navigate('/unauthorized')
      }
      CustomMessage.error("No Properties Found")
      console.error('Error fetching property data:', error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, limitPerPage, sortOrderByPrice]);
  const handleEdit = (propertyId) => {
    navigate(`/edit-property/${propertyId}`);
  };
  const handleViewDetails = (propertyId) => {
    navigate(`/view-property/${propertyId}`);
  };
  const handleSortByPriceChange = (newSortOrderByPrice) => {
    console.log("called")
    setSortOrderByPrice(newSortOrderByPrice);
  };
  const handleDelete = async (propertyId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this property?');
    try {
      if (isConfirmed) {
        await apiInstance.delete(`/listing/listings/${propertyId}`)

        setPropertyList((prevList) => prevList.filter((property) => property._id !== propertyId));
        console.log(`Property with ID ${propertyId} deleted successfully`);
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized');
      }
      console.error('Error deleting property:', error);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const totalPages = Math.ceil(totalProperties / limitPerPage);

  return (
    <MyLayout>
      <div>
        <h1 style={{ marginBottom: '16px' }}>Property Listings</h1>
        <Space style={{ marginBottom: '16px' }}>
          <Input
            type="text"
            placeholder="Search by Title or Address or Description"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            style={{ width: '300px' }}
          />
          <ButtonAtom
            style={{ marginLeft: '8px' }}
            onClick={handleButtonClick}
            disabled={loading}
          >
            Search
          </ButtonAtom>

          <ButtonAtom style={{ marginLeft: '8px' }} onClick={handleCreateProperty}>
            Create Property
          </ButtonAtom>
          <ButtonAtom style={{ marginLeft: '8px' }} onClick={handleBulkUpload}>
            Bulk Upload
          </ButtonAtom>
          <span style={{ marginLeft: '8px' }}>Sort by Price:</span>
          <Select
            value={sortOrderByPrice}
            onChange={(value) => handleSortByPriceChange(value)}
            style={{ width: '120px' }}
          >
            <Option value="asc">Asc</Option>
            <Option value="desc">Desc</Option>
          </Select>
        </Space>


        <PropertyList
          propertyList={propertyList}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />

        {Array.isArray(propertyList) && propertyList.length >= limitPerPage && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <ButtonAtom
              style={{ marginRight: '10px' }}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
            >
              Previous
            </ButtonAtom>
            <span style={{ margin: '0 5px' }}>{page}</span>
            <ButtonAtom
              style={{ marginLeft: '10px' }}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || loading}
            >
              Next
            </ButtonAtom>
          </div>
        )}
      </div>
    </MyLayout>
  );
};

export default ViewProperty;
