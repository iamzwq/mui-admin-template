import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function Progress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 96) {
          clearInterval(timer);
          return oldProgress;
        }
        const diff = (100 - oldProgress) * (Math.random() * 0.4 + 0.1);
        oldProgress += diff;
        return oldProgress;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: theme => theme.zIndex.tooltip }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
