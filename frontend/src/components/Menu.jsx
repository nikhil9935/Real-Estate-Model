
import { Menu } from './AntdComponents';
import { Link, useNavigate } from './Routers';

const MenuComponent= ({ selectedKey, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <Menu mode="vertical" theme="dark" onClick={onMenuClick}>
      <Menu.Item key="1" style={selectedKey === '1' ? { background: '#001529', color: '#ffffff' } : null}>
        <Link to="/view-property">View</Link>
      </Menu.Item>
      <Menu.Item key="2" style={selectedKey === '2' ? { background: '#001529', color: '#ffffff' } : null}>
        <Link to="/bulk-uploads">Bulk Upload Details</Link>
      </Menu.Item>
      <Menu.Item key="3" style={selectedKey === '3' ? { background: '#001529', color: '#ffffff' } : null}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
