
import { Result } from './AntdComponents';
import { Link } from './Routers';
import ButtonAtom from './Buttons';

const ResultComponent = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <ButtonAtom type="primary">Back Home</ButtonAtom>
        </Link>
      }
    />
  );
};

export default ResultComponent;
