// EditableField.tsx
import { faPencil, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface EditableFieldProps {
  onSubmit: (data: string) => Promise<void>;
  value: string | null;
}

const EditableField: React.FC<EditableFieldProps> = ({ onSubmit, value }) => {
  const [displayText, setDisplayText] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");

  const errorMessage = "Failed to update. Please try again.";

  useEffect(() => {
    setDisplayText(value || "");
  }, [value]);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleFormSubmit = async () => {
    try {
      await onSubmit(displayText);
      setIsEditable(false);
      setError("");
    } catch (error) {
      setError(errorMessage);
    }
  };

  const icon = () => {
    if (isEditable) {
      return (
        <button type="button" onClick={handleFormSubmit}>
          <FontAwesomeIcon
            className="w-3 cursor-pointer"
            icon={faCheck}
            data-testid="check-icon"
          />
        </button>
      );
    }
    return displayText === "" ? (
      <FontAwesomeIcon
        className="w-3 cursor-pointer"
        icon={faPlus}
        data-testid="plus-icon"
      />
    ) : (
      <FontAwesomeIcon
        className="w-3 cursor-pointer"
        icon={faPencil}
        data-testid="pencil-icon"
      />
    );
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditable ? (
        <div className="flex items-center  space-x-2">
          <input
            value={displayText}
            onChange={(e) => setDisplayText(e.target.value)}
            name="value"
            type="text"
            className="h-8 w-40 border border-gray-300 rounded p-2"
            data-testid="editable-field-input"
          />
          {icon()}
        </div>
      ) : (
        <span>{displayText || "Not provided"}</span>
      )}

      {!isEditable && (
        <span onClick={toggleEditable} className="cursor-pointer">
          {icon()}
        </span>
      )}
      {error && (
        <span data-testid="error-message" className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default EditableField;
