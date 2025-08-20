import {Tag} from 'antd';

const ErrorMessage = ({error}: {error: string}) => {
  return (
    <div className={`${error ? 'pb-3' : 'pb-0'}`}>
      {error && (
        <Tag color="error" bordered={false}>
          {error}
        </Tag>
      )}
    </div>
  );
};

export default ErrorMessage;
