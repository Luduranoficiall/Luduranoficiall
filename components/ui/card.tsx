import { ReactNode } from "react";
export function Card({ children, className="" }: { children: ReactNode; className?: string }) { return <div className={`rounded-xl border p-4 ${className}`}>{children}</div>; }
export function CardHeader({ children }: { children: ReactNode }) { return <div className="mb-2">{children}</div>; }
export function CardTitle({ children, className="" }: { children: ReactNode; className?: string }) { return <h3 className={className}>{children}</h3>; }
export function CardContent({ children }: { children: ReactNode }) { return <div>{children}</div>; }
