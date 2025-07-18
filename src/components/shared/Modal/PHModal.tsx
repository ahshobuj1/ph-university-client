import {Modal} from 'antd';

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const PHModal = ({children, open = false, setOpen, title}: IModalProps) => {
  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        footer={null}
        style={{padding: '5px'}}>
        {children}
      </Modal>
    </>
  );
};

export default PHModal;
