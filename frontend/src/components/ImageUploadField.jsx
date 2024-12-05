
import { Form, Upload, Button, Spin } from './AntdComponents';
import { UploadOutlined } from './AntdComponents';
import ButtonAtom from './Buttons';

const ImageUploadField = ({ fileList, onChange, customRequest, loading, onClick, label, name, rules, beforeUpload, maxCount, listType }) => {
  return (
    <Form.Item label={label} name={name} rules={rules} valuePropName="fileList" getValueFromEvent={beforeUpload}>
      <Upload customRequest={customRequest} fileList={fileList} onChange={onChange} beforeUpload={beforeUpload} maxCount={maxCount} listType={listType}>
        <ButtonAtom icon={<UploadOutlined />} loading={loading} onClick={onClick}>
          {loading ? 'Uploading' : 'Select File'}
        </ButtonAtom>
      </Upload>
      {loading && <Spin style={{ marginLeft: 10 }} />}
    </Form.Item>
  );
};

export default ImageUploadField;
