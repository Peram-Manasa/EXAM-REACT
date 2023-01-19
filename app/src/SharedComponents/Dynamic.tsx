import TextFieldF from "./TextFieldF"




export const Dynamic = (fieldName: string ,item:any) =>
{
    switch(fieldName)
    {
        case "TextFieldF" : return <TextFieldF {...item}/>;
        default : return 'Component not found';
    }
};
export default Dynamic