import {Popconfirm} from 'antd';
import {BiEdit} from 'react-icons/bi';
import {QuestionCircleOutlined} from '@ant-design/icons';

interface IActionBtnProps {
  title: string;
}

const EditActionBtn = ({title}: IActionBtnProps) => {
  return (
    <div>
      <Popconfirm
        title={`Update ${title}`}
        description={`Are you sure to update this ${title}?`}
        okText="Update"
        cancelText="Cancel"
        icon={<QuestionCircleOutlined style={{color: 'red'}} />}
        placement="topRight">
        <span className="cursor-pointer hover:bg-blue-100 text-primary p-2 rounded-lg transition-transform hover:scale-110 flex items-center">
          <BiEdit className="text-base" />
        </span>
      </Popconfirm>
    </div>
  );
};

export default EditActionBtn;
