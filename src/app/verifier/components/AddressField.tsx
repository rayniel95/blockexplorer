import { useTsController } from "@ts-react/form";

export default function AddressField() {
    const {
      field: { onChange, value },
      error,
    } = useTsController<string>();
  
    return (
      <>
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value ? value : ""}
        />
        {error && error.errorMessage}
      </>
    );
  }