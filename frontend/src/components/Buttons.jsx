
import { Button } from './AntdComponents';

const Buttons= ({ icon, type, htmlType, children, ...rest }) => {
  return (
    <Button icon={icon} type={type} htmlType={htmlType} {...rest}>
      {children}
    </Button>
  );
};

export default Buttons;
