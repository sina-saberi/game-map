import React from 'react'

const icons: { [name: string]: string } = {
}

interface IIconProps {
    icon: string
}

const Icon: React.FC<IIconProps> = ({ icon }) => {
    return (
        <React.Fragment>
            <i className={`icon ${icons[icon] || "icon-" + icon}`}></i>
        </React.Fragment>
    )
}

export default Icon