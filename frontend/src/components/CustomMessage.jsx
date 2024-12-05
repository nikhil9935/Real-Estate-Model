
import { message } from './AntdComponents';

const CustomMessage = {
  success: (content, duration) => {
    message.success(content, duration);
  },
  error: (content, duration) => {
    message.error(content, duration);
  },
  info: (content, duration) => {
    message.info(content, duration);
  },
  warning: (content, duration) => {
    message.warning(content, duration);
  },
};

export default CustomMessage;
