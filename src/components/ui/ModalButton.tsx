import {Button} from 'antd';
import {FaPlus} from 'react-icons/fa';

interface IButtonProps {
  modalOpen: (open: boolean) => void;
  title: string;
}

const ModalButton = ({modalOpen, title}: IButtonProps) => {
  return (
    <div>
      <Button
        icon={<FaPlus className="text-sm" />}
        size="large"
        type="primary"
        onClick={() => modalOpen(true)}
        className="rounded-lg text-white shadow-sm transition-transform hover:scale-105">
        {title}
      </Button>
    </div>
  );
};

export default ModalButton;
