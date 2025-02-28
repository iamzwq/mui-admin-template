import { FormProvider, useForm } from 'react-hook-form';
import { Button, Grid2 } from '@mui/material';
import { ControlledAutocomplete, ControlledCheckboxGroup, ControlledRadioGroup } from '~/components/controlled-form';

export function SearchForm() {
  const methods = useForm({
    defaultValues: {
      test: {
        label: 'Test',
        value: 'test',
      },
      hobby: [{ label: 'Basketball', value: 'basketball' }],
    },
  });
  const onSubmit = methods.handleSubmit(data => {
    console.log(data); // eslint-disable-line no-console
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 4, lg: 3 }}>
            <ControlledAutocomplete
              label="Test"
              name="test"
              options={[
                { label: 'Test', value: 'test' },
                { label: 'Test2', value: 'test2' },
                { label: 'Test3', value: 'test3' },
              ]}
            />
          </Grid2>
          <Grid2 size={{ md: 4, lg: 3 }}>
            <ControlledAutocomplete
              label="Hobby"
              name="hobby"
              multiple
              options={[
                { label: 'Basketball', value: 'basketball' },
                { label: 'Football', value: 'football' },
                { label: 'Tennis', value: 'tennis' },
              ]}
              disableCloseOnSelect
              slotProps={{
                chip: {
                  size: 'small',
                  sx: {
                    '.MuiChip-labelSmall': {
                      fontSize: 12,
                    },
                  },
                },
              }}
              limitTags={3}
            />
          </Grid2>
          <Grid2 size={{ md: 4, lg: 3 }}>
            <ControlledRadioGroup
              name="gender"
              row
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </Grid2>
          <Grid2 size={{ md: 4, lg: 3 }}>
            <ControlledCheckboxGroup
              name="hobbies"
              options={[
                { value: 'reading', label: 'Reading' },
                { value: 'gaming', label: 'Gaming' },
                { value: 'sports', label: 'Sports' },
              ]}
              rules={{
                required: 'Please select at least one hobby',
                validate: value => value.length <= 2 || 'You can only select up to 2 hobbies',
              }}
            />
          </Grid2>
          <Grid2 size={{ md: 4, lg: 3 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </FormProvider>
  );
}
