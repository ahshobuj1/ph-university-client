import {DatePicker, Form} from 'antd';
import {Controller, useFormContext} from 'react-hook-form';
import moment from 'moment';

interface IPHDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

const PHDatePicker = ({
  name,
  label,
  placeholder,
  disabled = false,
  size = 'large',
}: IPHDatePickerProps) => {
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
            <DatePicker
              value={field.value ? moment(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              }
              size={size}
              style={{width: '100%'}}
              placeholder={placeholder}
              disabled={disabled}
              disabledDate={(current) =>
                current && current < moment().startOf('day')
              }
            />
          </Form.Item>
        </>
      )}
    />
  );
};

export default PHDatePicker;
