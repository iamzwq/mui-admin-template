import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

type ControlledSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  SelectProps & {
    options?: Option[];
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

export function ControlledSelect<
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
  fullWidth = true,
  label,
  ...props
}: ControlledSelectProps<TFieldValues, TName>) {
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
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} label={label} error={!!fieldState.error} value={field.value ?? ''}>
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

/**
 * 使用示例：
 *
 * 1. 基本用法：
 * ```tsx
 * <ControlledSelect
 *   name="example"
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 * />
 * ```
 *
 * 2. 自定义渲染：
 * ```tsx
 * <ControlledSelect
 *   name="customSelect"
 *   render={(field, fieldState) => (
 *     <div>
 *       <Select
 *         {...field}
 *         error={!!fieldState.error}
 *         value={field.value ?? ''}
 *       >
 *         <MenuItem value="1">Custom Option 1</MenuItem>
 *         <MenuItem value="2">Custom Option 2</MenuItem>
 *       </Select>
 *       {fieldState.error && (
 *         <span style={{ color: 'red' }}>{fieldState.error.message}</span>
 *       )}
 *     </div>
 *   )}
 * />
 * ```
 *
 */
