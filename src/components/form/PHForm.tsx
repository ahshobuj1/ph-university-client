import {Form} from 'antd';
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

type IFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};

type IPHFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & IFormConfig;

const PHForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IPHFormProps) => {
  const formConfig: IFormConfig = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (values) => {
    onSubmit(values);
    methods.reset();
  };

  return (
    <Form onFinish={methods.handleSubmit(submit)} layout="vertical">
      <FormProvider {...methods}>{children}</FormProvider>
    </Form>
  );
};

export default PHForm;
