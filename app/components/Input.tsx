import {HTMLInputTypeAttribute} from "react";

export default function Input({placeholder, value, onChange, type}: {
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    type: HTMLInputTypeAttribute
}) {
    return <input
        type={type}
        className={"opacity-70 max-w-96 hover:opacity-100 focus:opacity-100 focus:outline-none rounded-lg px-4 py-2 bg-background-variant transition-all"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
            onChange(e.target.value)
        }}/>
}