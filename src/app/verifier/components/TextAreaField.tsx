import { useTsController } from "@ts-react/form";
import { Form } from "react-bootstrap";

export default function TextAreaField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <>
      <Form.Label>Contract code</Form.Label>
      <Form.Control id='code' as={'textarea'}
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""}
      />
      {error && error.errorMessage}
    </>
  );
}