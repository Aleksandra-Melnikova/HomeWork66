import React from "react";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner.tsx";
interface Props {
  isLoading?: boolean;
  text: string;
  isDisabled?: boolean;
  type?: "button" | "submit";
}

const ButtonLoading: React.FC<Props> = ({
  isDisabled = false,
  isLoading = false,
  text,
  type = "submit",
}) => {
  return (
    <div>
      <button
        type={type}
        disabled={isDisabled}
        className="btn btn-primary d-flex align-items-center buttons"
      >
        <span className="me-2 fs-4">{text}</span>
        {isLoading ? <ButtonSpinner /> : null}
      </button>
    </div>
  );
};

export default ButtonLoading;
