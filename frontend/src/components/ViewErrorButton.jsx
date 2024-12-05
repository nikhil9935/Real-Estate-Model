
import { Button } from "./AntdComponents";
import { FaEye } from "react-icons/fa";

const ViewErrorsButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="primary">
      <FaEye className="action-icon" />
    </Button>
  );
};

export default ViewErrorsButton;
