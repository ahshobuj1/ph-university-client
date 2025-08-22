import {ConfigProvider} from 'antd';
import {theme} from './lib/theme/theme';
// import MainLayout from './components/layout/MainLayout';
import SecondLayout from './components/layout/SecondLayout';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="max-w-[1420px] mx-auto">
        {/* <MainLayout /> */}
        <SecondLayout />
      </div>
    </ConfigProvider>
  );
}

export default App;
