
import { useNavigate } from '../../components/Routers';
import TextAreaField from '../../components/TextAreaField';
import InputField from '../../components/LoginFields';
import SwitchField from '../../components/SwitchField';
import CreateAxiosInstance from '../../components/AxiosInterceptor';
import { Form, Upload, InputNumber } from '../../components/AntdComponents';
import { UploadOutlined } from '../../components/AntdComponents';
import MyLayout from '../Layout/Layout';
import ButtonAtom from '../../components/Buttons';


const RealEstateForm = () => {
  const apiInstance = CreateAxiosInstance();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', values.title);
    formDataToSend.append('description', values.description);
    formDataToSend.append('price', values.price);
    formDataToSend.append('address', values.address);
    formDataToSend.append('file', values.file[0].originFileObj);
    const detailsString = JSON.stringify(values.details);
    console.log("DETAILS:", detailsString)

    formDataToSend.append('details', detailsString);
    console.log("data", formDataToSend)


    try {
      const response = await apiInstance.post('/listing/listings', formDataToSend);
      console.log(response)
      console.log(response.ok)
      navigate('/view-property')

      if (response.ok) {

        console.log('Listing submitted successfully!');
        navigate('./view-property')

      } else {
        console.error('Failed to submit listing');

      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized')
      }
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  return (
    <MyLayout>
      <Form
        form={form}
        name="realEstateForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}
      >
        <InputField label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]} />
        <TextAreaField label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]} />
        <InputField label="Address" name="address" rules={[{ required: true, message: 'Please enter the address!' }]} />
        <InputField label="Price" name="price" rules={[{ required: true, message: 'Please enter the price!' }]} />


        <Form.Item
          label="Image"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
            <ButtonAtom icon={<UploadOutlined />}>Select File</ButtonAtom>
          </Upload>
        </Form.Item>

        <InputField label="Bedrooms" name={['details', 'bedrooms']} rules={[{ required: true }]} />
        <InputField label="Bathrooms" name={['details', 'bathrooms']} rules={[{ required: true }]} />
        <InputField label="Area Square Feet" name={['details', 'areaSquareFeet']} />


        <SwitchField label="Is Furnished" name={['details', 'isFurnished']} rules={[{ required: true }]} />
        <SwitchField label="Has Garage" name={['details', 'hasGarage']} rules={[{ required: true }]} />
        <SwitchField label="isPetsAllowed" name={['details', 'isPetsAllowed']} rules={[{ required: true }]} />
        <SwitchField label="Has Swimming Pool" name={['details', 'hasSwimmingPool']} rules={[{ required: true }]} />

        <SwitchField label="isSecurityEnabled" name={['details', 'isSecurityEnabled']} rules={[{ required: true }]} />
        <SwitchField label="isGatedCommunity" name={['details', 'isGatedCommunity']} rules={[{ required: true }]} />
        <SwitchField label="hasGarden" name={['details', 'hasGarden']} rules={[{ required: true }]} />

        <InputField label="Construction Year" name={['details', 'constructionYear']} />

        <InputField
          label="Energy Efficiency Rating"
          name={['details', 'energyEfficiencyRating']}
          rules={[
            { type: 'string', required: true, message: 'Please enter a valid string value for energy efficiency rating!' },
          ]}
        />

        <InputField
          label="Agent Name"
          name={['details', 'agentName']}
          rules={[{ required: true, message: 'Please enter the agent name!' }]}
        />

        <InputField
          label="Agent Email"
          name={['details', 'contactEmail']}
          rules={[{ required: true, message: 'Please enter the agent email!' }]}
        />

        <InputField
          label="Agent Number"
          name={['details', 'contactPhone']}
          rules={[
            { required: true, message: 'Please enter the agent phone!' },

          ]}
          render={(props) => <InputNumber style={{ width: '100%' }} {...props} />}
        />





        <ButtonAtom type="primary" htmlType="submit">
          Submit
        </ButtonAtom>
      </Form>
    </MyLayout>
  );
};

export default RealEstateForm;
