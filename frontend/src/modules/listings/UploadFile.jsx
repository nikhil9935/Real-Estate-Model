import { useState } from "../../components/Hooks";
import MyLayout from "../Layout/Layout";
import { useNavigate } from "../../components/Routers";
import ImageUploadField from "../../components/ImageUploadField";
import ButtonAtom from "../../components/Buttons";
import CustomMessage from "../../components/CustomMessage";
import CreateAxiosInstance from "../../components/AxiosInterceptor";


const UploadFileOrganism = () => {
  const apiInstance = CreateAxiosInstance()
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info) => {
    // if (info.fileList.length > 1) {
    //   info.fileList.shift();
    // }
    setFile(info.file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      CustomMessage.error('Please select a file before uploading.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file.originFileObj);

    try {
      const response = await apiInstance.post('/listing/bulk-upload', formData)

      console.log("response", response)

      CustomMessage.success('File uploaded successfully.');
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/unauthorized');
      }
      console.error('Error uploading file:', error);
      CustomMessage.error('Error uploading file.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <MyLayout>
      <div className="upload-file-container">
        <h3>Upload CSV File</h3>
        <ImageUploadField
          fileList={file ? [file] : []}
          onChange={handleFileChange}
          customRequest={() => { }}
          loading={loading}
          onClick={handleFileChange}
        />
      </div>
      <ButtonAtom type="primary" onClick={handleFileUpload} >
        Upload
      </ButtonAtom>
    </MyLayout>
  );
};

export default UploadFileOrganism;
