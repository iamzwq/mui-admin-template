import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { cn } from '~/utils';

interface Step {
  label: string;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
  progress?: number;
}

const steps = [
  {
    label: 'Printing',
    status: 'completed' as const,
  },
  {
    label: 'Binding',
    status: 'failed' as const,
  },
  {
    label: 'Inserting',
    status: 'in-progress' as const,
    progress: 62,
  },
  {
    label: 'Shipping',
    status: 'pending' as const,
  },
];

const getStepColor = (status: Step['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-primary text-white';
    case 'failed':
      return 'bg-(--palette-error-light) text-white';
    case 'in-progress':
      return 'bg-(--palette-success-light) text-white';
    default:
      return 'bg-(--palette-grey-200) text-gray-500';
  }
};

const getStepIcon = (status: Step['status']) => {
  switch (status) {
    case 'completed':
      return <CheckOutlinedIcon sx={{ fontSize: 16 }} />;
    case 'failed':
      return <CloseOutlinedIcon sx={{ fontSize: 16 }} />;
    default:
      return null;
  }
};

export default function Profile() {
  return (
    <div className="mx-auto mt-9 flex w-[600px]">
      {steps.map((step, index) => (
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.08, ease: 'linear' }}
          key={index}
          className={cn(
            'relative flex h-4.5 w-full flex-1 cursor-pointer items-center justify-center',
            getStepColor(step.status),
            index === 0 && 'rounded-l-full',
            index === steps.length - 1 && 'rounded-r-full'
          )}
          style={{
            clipPath:
              index === 0
                ? 'polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 0% 0%)'
                : index === steps.length - 1
                  ? 'polygon(100% 0%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)'
                  : 'polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%)',
          }}
        >
          <Typography variant="body2" fontSize={12} noWrap className="select-none">
            {getStepIcon(step.status)}
            <span>{step.label}</span>
            {step.progress && <span>({step.progress}%)</span>}
          </Typography>
        </Box>
      ))}
    </div>
  );
}
