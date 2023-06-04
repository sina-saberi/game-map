import React from 'react'

type OptionType = { value: string, id: string }
interface ISelectProps {
    data: OptionType[];
    placeholder?: string;
    label?: string;
    name: string;
    onChange: (id: OptionType["id"]) => void;
    value: OptionType["id"]
}
const Select = ({ data, placeholder, label, name, onChange, value }: ISelectProps) => {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <label className='flex flex-col w-min min-w-[100px]' htmlFor={name}>
                {label}
                <div className='whitespace-nowrap relative'>
                    <button onClick={() => setOpen(!open)} className='flex items-center justify-center'>
                        {data.find(x => x.id == value)?.value || placeholder || ""}
                        <span className={`${!open ? "rotate-[270deg]" : "rotate-90"} mx-2`}>{"<"}</span>
                    </button>
                    {open &&
                        <div style={{ zIndex: 9999999999 }} className='w-full absolute top-full max-h-[200px] overflow-y-auto bg-white'>
                            <div className='flex flex-col'>
                                {data.map((op, index) =>
                                    <button onClick={() => { onChange(op.id); setOpen(false) }} className='hover:bg-black/10 py-2 flex px-4 text-xs' key={index}>{op.value}</button>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </label>
            {open && <div onClick={() => setOpen(false)} style={{ zIndex: 999999999 }} className='fixed top-0 left-0 w-full h-full'></div>}
        </React.Fragment>
    )
}

export default Select