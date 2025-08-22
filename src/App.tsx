import {ConfigProvider} from 'antd';
import {theme} from './lib/theme/theme';
// import MainLayout from './components/layout/MainLayout';
// import ProtectedRoutes from './routes/ProtectedRoutes';
import SecondLayout from './components/layout/SecondLayout';

function App() {
  return (
    <ConfigProvider theme={theme}>
      {/* <ProtectedRoutes> */}
      <div className="max-w-[1420px] mx-auto">
        {/* <MainLayout /> */}
        <SecondLayout />
      </div>
      {/* </ProtectedRoutes> */}
    </ConfigProvider>
  );
}

export default App;
