import { ValueEditor, ValueEditorProps } from "react-querybuilder";
import SearchAndSelect from "./SearchAndSelect";

function hasDatatype(field: any): field is { datatype: string } {
  return field && typeof field.datatype === "string";
}

export const CustomValueEditor = (props: ValueEditorProps) => {
  console.log({ props });
  if (
    hasDatatype(props.fieldData) &&
    props.fieldData.datatype === "movieTitle"
  ) {
    console.log("Are we in?");
    return (
      <div>
        <SearchAndSelect handleOnChange={props.handleOnChange} />
      </div>
    );
  }
  return <ValueEditor {...props} />;
};
