import { useLocation, useNavigation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Progress } from '~/components/progress';

export function Content() {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Progress />;
  }

  return (
    <main className="grow overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
