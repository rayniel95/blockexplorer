import { useTsController } from "@ts-react/form";

export default function NumberField() {
    const {
      field: { onChange, value },
      error,
    } = useTsController<number>();
    return (
      <>
        <span>
          <input
            value={value !== undefined ? value + "" : "-1"}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) onChange(undefined);
              else onChange(value);
            }}
          />
          {error && error.errorMessage}
        </span>
      </>
    );
  }