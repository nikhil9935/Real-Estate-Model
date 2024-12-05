
import { Form, Switch } from './AntdComponents';

const SwitchField = ({ label, name, rules }) => (
  <Form.Item label={label} name={name} rules={rules} valuePropName="checked">
    <Switch />
  </Form.Item>
);

export default SwitchField;
