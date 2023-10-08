import { useTsController } from "@ts-react/form";
import { Form } from "react-bootstrap";

export default function NumberField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<number>();
  return (
    <>
      <Form.Label>At block</Form.Label>
      <Form.Control id='addressBlock' type="text"
        value={value !== undefined ? value + "" : ""}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (isNaN(value)) onChange(undefined);
          else onChange(value);
        }} 
      />
      {error && error.errorMessage}
    </>
  );
}