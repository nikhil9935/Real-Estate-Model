import { Result } from 'antd';
import { useNavigate } from '../components/Routers';
import ButtonAtom from '../components/Buttons';

const UnauthorizedPage = () => {
  const Navigate = useNavigate()
  const handleSignIn = () => {
    console.log('Redirecting to the sign-in page...');
    Navigate('/')
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <ButtonAtom type="primary" onClick={handleSignIn}>
          Sign In Again
        </ButtonAtom>
      }
    />
  );
};
export default UnauthorizedPage;
