import React from "react";

function Sortable({sortable, value, onChange} :
                  {sortable: string[],
                      value: string,
                      onChange: (e : React.ChangeEvent<HTMLSelectElement>) => void}){
    return (
        <select
            defaultValue={sortable[0]}
            onChange={onChange}
            className="text-sm"
            value={value}
        >
        {sortable.map((s) => (
            <option value={s}>{s}</option>
        ))}
        </select>
    )
}

export default Sortable;
