import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';

type ControlledCheckboxGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  Omit<FormControlProps, 'defaultValue'> & {
    options: Option[];
    label?: string;
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

export function ControlledCheckboxGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  defaultValue,
  shouldUnregister,
  control,
  render,
  options,
  label,
  ...props
}: ControlledCheckboxGroupProps<TFieldValues, TName>) {
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

  const values = (field.value as (string | number)[]) || [];

  const handleChange = (value: string | number) => {
    const newValues = values.includes(value) ? values.filter(v => v !== value) : [...values, value];
    field.onChange(newValues);
  };

  return (
    <FormControl error={!!fieldState.error} {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            control={<Checkbox checked={values.includes(option.value)} onChange={() => handleChange(option.value)} />}
            label={option.label}
          />
        ))}
      </FormGroup>
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
}
