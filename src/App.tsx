import {ConfigProvider} from 'antd';
import {theme} from './lib/theme/theme';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    </ConfigProvider>
  );
}

export default App;
