import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export interface RadioBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean
    activeColor: 'green' | 'red'
}

export const RadioBox: React.FC<RadioBoxProps> = ({ isActive, activeColor, children, className, onClick }) => {

    return (
        <button className={clsx(
            {
                "text-success hover:bg-success/10 border-success": activeColor === 'green',
                "text-danger hover:bg-danger/10 border-danger": activeColor === 'red',
                "bg-success/10": isActive && activeColor === 'green',
                "bg-danger/10": isActive && activeColor === 'red',

            },
            "flex w-full rounded-md border-2  justify-center items-center transition-colors duration-200",
            className
        )}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    )
}