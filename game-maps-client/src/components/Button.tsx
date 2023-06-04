import React from 'react'

interface IButtonProps {
    children: string;
    onClick?: () => void
}
const Button: React.FC<IButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className='bg-blue-500 text-white px-2 py rounded-md'>
            {children}
        </button>
    )
}

export default Button