import {Form, TimePicker} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';

interface IPHTimePickerProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
  format?: string;
}

const PHTimePicker = ({
  name,
  placeholder,
  disabled = false,
  size = 'large',
  icon,
  format = 'HH:mm',
}: IPHTimePickerProps) => {
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
            <TimePicker
              value={field.value ? dayjs(field.value) : dayjs()}
              onChange={(value) => field.onChange(value)}
              placeholder={placeholder}
              size={size}
              disabled={disabled}
              prefix={icon}
              format={format}
            />
          </Form.Item>
        </>
      )}
    />
  );
};

export default PHTimePicker;
