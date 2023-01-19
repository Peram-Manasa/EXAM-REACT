import { useFormContext } from "react-hook-form";
import {TextField } from '@fluentui/react'
import { Controller } from "react-hook-form";
import { NONAME } from "dns";





interface ITextFieldFormProps {
    name: string | number | any;
    typeOf?:string| number;
    label: string;
    isRequired : string;
    placeholder?: string;
}

const TextFieldF = (
    {
        name,
        typeOf,
        label,
        isRequired,
        placeholder

    }: ITextFieldFormProps
) =>
{
const {control, register} = useFormContext();
return (
    <>
    <Controller 
    control = {control}
    name={name}
    render = {({
        field, 
        fieldState: {error},
    }) =>{
        return (
            <>
            <div className = { isRequired? (error ? "eroor": "errorGroup"):""}>
                <TextField type= { typeOf === 'number'? "number": 'text'}
                label = {label}
                styles={{fieldGroup:{background:"rgb(237,237,237)", border:0,borderRadius:8,}}}
                placeholder = {placeholder}
                {...field} errorMessage = {error ? error.message: ""}
                className = {isRequired ? (error ? "error" : "errorGroup"): ""}
                />
            </div>
            </>
        )
    }}
    />
    </>
);

};
export default TextFieldF;