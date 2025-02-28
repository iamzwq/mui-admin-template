import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledAutocomplete } from './controlled-autocomplete';
import { ControlledSelect } from './controlled-select';
import { ControlledTextField } from './controlled-text-field';

interface Step {
  name: string;
  components: React.ReactElement[];
}

export function MultiStepFormExample() {
  const { handleSubmit, trigger } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      name: 'step1',
      components: [
        <ControlledSelect
          key="step1Select"
          name="step1Select"
          options={[
            { value: '1', label: 'Step 1 Option 1' },
            { value: '2', label: 'Step 1 Option 2' },
          ]}
        />,
        <ControlledTextField key="step1Text" name="step1Text" label="Step 1 Text Field" />,
      ],
    },
    {
      name: 'step2',
      components: [
        <ControlledSelect
          key="step2Select"
          name="step2Select"
          options={[
            { value: '1', label: 'Step 2 Option 1' },
            { value: '2', label: 'Step 2 Option 2' },
          ]}
        />,
        <ControlledTextField key="step2Text" name="step2Text" label="Step 2 Text Field" />,
        <ControlledAutocomplete
          key="step2Auto"
          name="step2Auto"
          options={[
            { value: '1', label: 'Auto Option 1' },
            { value: '2', label: 'Auto Option 2' },
          ]}
        />,
      ],
    },
  ];

  const onSubmit = (data: unknown) => {
    console.log('Form data:', data); // eslint-disable-line no-console
  };

  const nextStep = async () => {
    const isValid = await trigger(steps[currentStep].name);
    if (isValid) {
      setCurrentStep(step => Math.min(step + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(step => Math.max(step - 1, 0));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[currentStep].components.map(component => component)}
        <div>
          {currentStep > 0 && (
            <button type="button" onClick={prevStep}>
              上一步
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={nextStep}>
              下一步
            </button>
          ) : (
            <button type="submit">提交</button>
          )}
        </div>
      </form>
    </div>
  );
}
