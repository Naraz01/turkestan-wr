import React from "react";

export const Input = ({text, name, type, onChangeText}) => {
    let [value, setValue] = React.useState(text)
    const onChange = (e) => {
        setValue(e.target.value)
        onChangeText(value)
    }
    return (
        <input
            type = {type}
            value = {value}
            onChange = {(e) => onChange(e)}
            className = {'forms-input'}
        />
    )
};
