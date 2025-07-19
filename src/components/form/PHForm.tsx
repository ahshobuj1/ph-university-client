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
  const {handleSubmit, reset} = methods;

  const submit: SubmitHandler<FieldValues> = (values) => {
    onSubmit(values);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
