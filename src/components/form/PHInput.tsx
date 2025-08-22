import {Form, Input} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';

interface IPHInputProps {
  name: string;
  type?: string | 'text';
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
  required?: boolean;
}

const PHInput = ({
  name,
  type,
  placeholder,
  required,
  disabled = false,
  size = 'large',
  icon,
}: IPHInputProps) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <Form.Item
            name={name}
            required
            validateStatus={error ? 'error' : ''}
            help={error ? error.message : ''}>
            <Input
              {...field}
              size={size}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              prefix={icon}
              required={required}
            />
          </Form.Item>
        </>
      )}
    />
  );
};

export default PHInput;
