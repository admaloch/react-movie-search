import { ReactNode } from 'react';
import './Card.css'

interface MainCardProps {
    children: ReactNode;
    bgColor?: string;
}

export default function Card({bgColor = 'var(--mainBackground)', children}:MainCardProps) {
  return (
    <div style={{backgroundColor: bgColor}} className="main-card">
        {children}
    </div>
  )
}
