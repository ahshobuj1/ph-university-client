import {Button, Col, Flex, Row} from 'antd';
import svgImage from '../../assets/images/reset-password.png';
import PHForm from '../../components/form/PHForm';
import PHInput from '../../components/form/PHInput';
import type {FieldValues} from 'react-hook-form';
import {RiKeyFill} from 'react-icons/ri';
import {useChangePasswordMutation} from '../../redux/features/auth/authApi';
import {toast} from 'sonner';
import {useState} from 'react';
import {getErrorMessage} from '../../utils/getErrorMessage';
import ErrorMessage from '../../components/shared/ErrorMessage';

const ChangePassword = () => {
  const [error, setError] = useState('');
  const [changePassword, {isLoading}] = useChangePasswordMutation();

  const handleSubmit = async (values: FieldValues) => {
    if (values.oldPassword === values.newPassword) {
      return setError('old password should not be new password!');
    }
    setError('');

    try {
      const res = await changePassword(values).unwrap();
      if (res?.success) {
        toast.success('password is changed successfully!');
      } else {
        const message = res?.message;
        setError(message);
        toast.error(message);
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    }
  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-gray-100 p-10 shadow-xl rounded-xl max-w-xl">
        <Row gutter={[0, 30]} justify="center" align="middle">
          <Col span={24}>
            <img
              src={svgImage}
              alt="Change Password"
              className="w-60 h-auto mx-auto"
            />
          </Col>
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold mb-1">
              Change Your Password
            </h2>
            <p>Keep your account secure by choosing a strong password.</p>
          </div>

          <Col span={24}>
            <PHForm onSubmit={handleSubmit}>
              {error && <ErrorMessage error={error} />}
              <PHInput name="oldPassword" placeholder="Your Old Password" />
              <PHInput name="newPassword" placeholder="Your New Password" />

              <Flex vertical gap="small" className="site-button-ghost-wrapper">
                <Button
                  htmlType="submit"
                  icon={<RiKeyFill />}
                  size="large"
                  type="primary"
                  loading={isLoading}>
                  Change Password
                </Button>
              </Flex>
            </PHForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChangePassword;
