import {Skeleton, Spin} from 'antd';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
      <div className="my-5">
        <Spin size="large" />
      </div>

      <Skeleton active avatar></Skeleton>
      <Skeleton active avatar></Skeleton>
      <Skeleton active avatar></Skeleton>
    </div>
  );
};

export default Loading;
