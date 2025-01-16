import React from "react";

interface InfoCardProps {
  children: React.ReactNode;
  classes?: string;
}

export default function InfoCard({ children, classes }: InfoCardProps) {
  const itemClass = classes ? `info-card ${classes}` : "info-card";

  return <div className={itemClass}>{children}</div>;
}
