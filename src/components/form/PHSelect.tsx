import {Form, Select} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';

interface IPHSelectProps {
  name: string;
  label: string;
  type?: string | 'text';
  placeholder?: string;
  disabled?: boolean;
  options: {value: string; label: string; disabled?: boolean}[] | undefined;
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
}

const PHSelect = ({
  name,
  label,
  placeholder,
  disabled = false,
  size = 'large',
  icon,
  options,
}: IPHSelectProps) => {
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
            <Select
              {...field}
              options={options}
              showSearch
              size={size}
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

export default PHSelect;
