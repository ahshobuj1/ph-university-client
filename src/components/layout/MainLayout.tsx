import {
  Avatar,
  Col,
  Dropdown,
  Layout,
  Modal,
  Row,
  Space,
  Typography,
  type MenuProps,
} from 'antd';
const {Header, Content, Footer} = Layout;
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import {SettingOutlined} from '@ant-design/icons';
import {toast} from 'sonner';
// import {useAppDispatch} from '../../redux/hooks';
// import {logout} from '../../redux/features/auth/authSlice';

const MainLayout = () => {
  // const dispatch = useAppDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  // const profileDropdown = (
  //   <div>
  //     <p>Edit Profile</p>
  //     <p>Setting</p>
  //     <p>Logout</p>
  //   </div>
  // );

  const handleMenuClick: MenuProps['onClick'] = ({key}) => {
    if (key === '3') {
      Modal.confirm({
        title: 'Are you sure you want to logout?',
        okText: 'Logout',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          toast.success('Logged out successfully!');
          // navigate('/login');
        },
      });
    } else if (key === '2') {
      // navigate('/profile');
    } else if (key === '4') {
      // navigate('/settings');
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key: '3',
      label: 'Logout',
      extra: '⌘L',
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
  ];

  return (
    <Layout style={{height: '100%'}}>
      <Sidebar />
      <Layout>
        <Header className="sticky top-0 z-50 w-full">
          <Row justify="space-between" align="middle">
            <Col>
              <Typography style={{color: 'white'}}>Hello A H Shobuj</Typography>
              <Typography style={{color: 'white'}}>
                Welcome To PH University
              </Typography>
            </Col>
            <Col>
              <Dropdown menu={{items, onClick: handleMenuClick}}>
                <Space onClick={(e) => e.preventDefault()}>
                  <Avatar
                    size={50}
                    shape="square"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <Content style={{margin: '24px 16px 0'}}>
          <Outlet /> {/* Main content */}
        </Content>
        <Footer className="text-center">
          AH ©{new Date().getFullYear()} Created by AH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
