import {Button, Layout} from 'antd';
const {Header, Content, Footer} = Layout;
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../redux/features/auth/authSlice';

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{height: '100%'}}>
      <Sidebar />
      <Layout>
        <Header className="sticky top-0 z-50 w-full bg-[#001529]">
          <ul>
            <li>
              <Button
                onClick={handleLogout}
                type="primary"
                size="large"
                style={{padding: '0 30px'}}>
                Logout
              </Button>
            </li>
          </ul>
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
