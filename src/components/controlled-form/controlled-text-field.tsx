import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  TextFieldProps & {
    render?: (
      field: ControllerRenderProps<TFieldValues, TName>,
      fieldState: {
        error?: { message?: string };
        isTouched: boolean;
        isDirty: boolean;
        invalid: boolean;
      }
    ) => React.ReactElement;
  };

export function ControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  defaultValue,
  shouldUnregister,
  control,
  render,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
  const context = useFormContext<TFieldValues>();
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue,
    shouldUnregister,
    control: control ?? context.control,
  });

  if (render) {
    return render(field, fieldState);
  }

  return (
    <TextField
      {...field}
      {...props}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      value={field.value ?? ''}
    />
  );
}
