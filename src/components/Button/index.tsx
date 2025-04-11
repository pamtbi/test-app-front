import style from "./style.module.sass";
import clsx from "clsx";


interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export const Button = ({className, children, ...props}: ButtonProps) => {
  return (
    <button {...props} className={clsx(style.button, className)}>
      {children}
    </button>
  )
}