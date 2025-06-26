import {Layout} from 'antd';
const {Header, Content, Footer} = Layout;
import {Outlet} from 'react-router-dom';
import Sidebar from '../shared/Sidebar';

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

const MainLayout = () => {
  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <Header style={{padding: 0}} />
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
