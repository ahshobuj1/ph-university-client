import {Form, Input} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';

interface IPHInputProps {
  name: string;
  label: string;
  type?: string | 'text';
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
}

const PHInput = ({
  name,
  label,
  type,
  placeholder,
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
            label={label}
            name={name}
            validateStatus={error ? 'error' : ''}
            help={error ? error.message : ''}>
            <Input
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

export default PHInput;
