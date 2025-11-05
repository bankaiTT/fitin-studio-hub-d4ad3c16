import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealCardProps {
  type: string;
  label: string;
  calories: number;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  isSelected: boolean;
}

export const MealCard = ({ label, calories, icon: Icon, color, onClick, isSelected }: MealCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary shadow-lavender-glow' : ''
      }`}
    >
      <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-lg mb-1">{label}</h3>
      <p className="text-sm text-muted-foreground">{calories} cal</p>
    </motion.div>
  );
};
