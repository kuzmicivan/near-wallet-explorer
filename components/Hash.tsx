import { FunctionComponent } from "react";

interface Stats {
    label: string,
    value: any
}

const Stat : FunctionComponent<Stats> = ({ label, value}) => {
    return (
        <div className="grid grid-cols-1 py-2 px-6">
            <label>
                {label}
            </label>
            <label className="text-slate-400">
                {value}
            </label>
        </div>
    )
}

export default Stat;