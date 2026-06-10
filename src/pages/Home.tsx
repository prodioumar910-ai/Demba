import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';
import Section5 from '../components/Section5';

export default function Home() {
  const { theme } = useTheme();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-black"
    >
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </motion.main>
  );
}

