
import React from 'react';
import { icons } from 'lucide-react';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  // @ts-ignore
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null; // or a default icon
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
