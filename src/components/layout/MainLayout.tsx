import {Button, Layout} from 'antd';
const {Header, Content, Footer} = Layout;
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../redux/features/auth/authSlice';

const MainLayout = () => {
  const dispatch = useAppDispatch();

  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <Header>
          <ul>
            <li className="text-white">
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </li>
          </ul>
        </Header>

        <Content style={{margin: '24px 16px 0'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <Outlet /> {/* Main content */}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          AH ©{new Date().getFullYear()} Created by AH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
