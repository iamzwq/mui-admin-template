import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

type ControlledAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends { label: string; value: string } = { label: string; value: string },
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  Omit<AutocompleteProps<T, boolean, boolean, boolean>, 'renderInput' | 'value' | 'onChange'> & {
    label?: string;
    filterSelectedOptions?: boolean;
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

export function ControlledAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends { label: string; value: string } = { label: string; value: string },
>({
  name,
  rules,
  defaultValue,
  shouldUnregister,
  control,
  render,
  ...props
}: ControlledAutocompleteProps<TFieldValues, TName, T>) {
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
    <Autocomplete
      {...props}
      value={field.value ?? (props.multiple ? [] : null)}
      onChange={(_, value) => field.onChange(value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option: T | string) => (typeof option === 'string' ? option : option.label)}
      renderInput={params => (
        <TextField {...params} error={!!fieldState.error} helperText={fieldState.error?.message} label={props.label} />
      )}
    />
  );
}
