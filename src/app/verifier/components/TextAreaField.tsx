import { useTsController } from "@ts-react/form";

export default function TextAreaField() {
    const {
      field: { onChange, value },
      error,
    } = useTsController<string>();
  
    return (
      <>
        <input 
          type="textarea"
          onChange={(e) => onChange(e.target.value)}
          value={value ? value : ""}
        />
        {error && error.errorMessage}
      </>
    );
  }