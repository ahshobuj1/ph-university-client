import {ConfigProvider} from 'antd';
import {theme} from './lib/theme/theme';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <ProtectedRoutes>
        <div className="max-w-[1420px] mx-auto">
          <MainLayout />
        </div>
      </ProtectedRoutes>
    </ConfigProvider>
  );
}

export default App;
