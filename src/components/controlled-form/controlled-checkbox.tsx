import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material';

type ControlledCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  CheckboxProps & {
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

export function ControlledCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  defaultValue,
  shouldUnregister,
  control,
  render,
  label,
  ...props
}: ControlledCheckboxProps<TFieldValues, TName>) {
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
    <FormControl error={!!fieldState.error}>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={field.value ?? false}
            onChange={e => field.onChange(e.target.checked)}
          />
        }
        label={label}
      />
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
}

/**
 * 使用示例：
 *
 * 1. 基本用法：
 * ```tsx
 * <ControlledCheckbox
 *   name="agreement"
 *   label="I agree to the terms"
 * />
 * ```
 *
 * 2. 带验证规则：
 * ```tsx
 * <ControlledCheckbox
 *   name="agreement"
 *   label="I agree to the terms"
 *   rules={{ required: 'You must agree to the terms' }}
 * />
 * ```
 *
 * 3. 自定义渲染：
 * ```tsx
 * <ControlledCheckbox
 *   name="customCheckbox"
 *   render={(field, fieldState) => (
 *     <div>
 *       <Checkbox
 *         {...field}
 *         checked={field.value ?? false}
 *         onChange={e => field.onChange(e.target.checked)}
 *       />
 *       {fieldState.error && (
 *         <span style={{ color: 'red' }}>{fieldState.error.message}</span>
 *       )}
 *     </div>
 *   )}
 * />
 * ```
 */
