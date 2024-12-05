
import { Form, Input } from './AntdComponents';

const TextAreaField = ({ label, name, rules }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input.TextArea />
  </Form.Item>
);

export default TextAreaField;
