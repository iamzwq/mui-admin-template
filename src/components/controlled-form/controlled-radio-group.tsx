import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type ControlledRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  Omit<FormControlProps, 'defaultValue'> & {
    options: Option[];
    label?: string;
    row?: boolean;
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

export function ControlledRadioGroup<
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
  row,
  ...props
}: ControlledRadioGroupProps<TFieldValues, TName>) {
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
    <FormControl error={!!fieldState.error} {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...field} row={row} value={field.value ?? ''}>
        {options.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
}
