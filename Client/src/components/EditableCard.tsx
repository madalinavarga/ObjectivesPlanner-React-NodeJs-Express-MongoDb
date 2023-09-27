import { useState, ChangeEventHandler, useEffect } from "react";
import { Section } from "../schemas/section";
import useSections from "../services/sections";

type Props = {
  section: Section;
};

function EditableCard({ section }: Props) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [newText, setNewText] = useState(section.name);
  const { update } = useSections();

  useEffect(() => {
    setNewText(section.name);
  }, [section.name]);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewText(e.target.value);
  };

  const handleMouseLeave = () => {
    setIsInEditMode(false);
    section.name = newText;
    update(section);
  };

  return (
    <div className="cursor-pointer">
      {isInEditMode ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => handleTextChange(e)}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <div onClick={() => setIsInEditMode(true)}>{newText}</div>
      )}
    </div>
  );
}

export default EditableCard;
