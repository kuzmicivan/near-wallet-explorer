import { FunctionComponent } from "react";

interface Stats {
    label: string
    value: string
}

const Stat : FunctionComponent<Stats> = ({ label, value }) => {
    return (
        <div className="bg-zinc-800 text-slate-300 rounded-md h-14 w-80 flex justify-between items-center shadow-md">
            <label className="px-7">
                {label} 
            </label>
            <label className="px-7 h-8 items-center flex gap-1 bg-purple-900 rounded-md mr-8 shadow-md">
                {value} 
            </label>
        </div>
    )
}

export default Stat;