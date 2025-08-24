import {QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {Popconfirm} from 'antd';

interface IActionBtnProps {
  title: string;
  onConfirm: (open: string) => void;
  id: string;
  loading?: boolean;
}

const DeleteActionBtn = ({title, onConfirm, id, loading}: IActionBtnProps) => {
  return (
    <div>
      <Popconfirm
        title={`Delete ${title}`}
        description={`Are you sure to delete this ${title}?`}
        onConfirm={() => onConfirm(id)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{loading: loading}}
        icon={<QuestionCircleOutlined style={{color: 'red'}} />}
        placement="topLeft">
        <span className="cursor-pointer hover:bg-red-100 text-red-700 p-2 rounded-lg transition-transform hover:scale-110">
          <DeleteOutlined />
        </span>
      </Popconfirm>
    </div>
  );
};

export default DeleteActionBtn;
