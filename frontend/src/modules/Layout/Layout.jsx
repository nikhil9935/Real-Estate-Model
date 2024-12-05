
import { useState, useEffect } from '../../components/Hooks';
import { Layout } from '../../components/AntdComponents';
import { useNavigate } from '../../components/Routers';
import MenuComponent from '../../components/Menu';
import axios from 'axios';

const { Sider, Content } = Layout;

const MyLayout = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState('1');

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === '3') {
      localStorage.removeItem('jwtToken');
      navigate('/login');
    } else {
      setSelectedKey(key);
    }
  };

  useEffect(() => {
  console.clear()
  const token=localStorage.getItem('jwtToken')
  console.log(token)
  if(!token){
    navigate('/unauthorized')
  }
  }, [axios,navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <MenuComponent selectedKey={selectedKey} onMenuClick={handleMenuClick} />
      </Sider>
      <Content style={{ margin: '16px' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MyLayout;
