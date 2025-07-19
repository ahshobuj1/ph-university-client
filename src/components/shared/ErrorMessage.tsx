import {Tag} from 'antd';

const ErrorMessage = ({error}: {error: string}) => {
  return (
    <div className="pb-3">
      <Tag color="error" bordered={false}>
        {error}
      </Tag>
    </div>
  );
};

export default ErrorMessage;
