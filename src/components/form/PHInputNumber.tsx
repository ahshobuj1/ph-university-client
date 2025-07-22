import {Form, InputNumber} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';

interface IPHInputNumberProps {
  name: string;
  type?: string | 'text';
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
}

const PHInputNumber = ({
  name,
  type,
  placeholder,
  disabled = false,
  size = 'large',
  icon,
}: IPHInputNumberProps) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <Form.Item
            name={name}
            validateStatus={error ? 'error' : ''}
            help={error ? error.message : ''}>
            <InputNumber
              min={1}
              max={10}
              {...field}
              size={size}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              prefix={icon}
            />
          </Form.Item>
        </>
      )}
    />
  );
};

export default PHInputNumber;
