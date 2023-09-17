import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function ObjectiveNavigator() {
  const navigator = useNavigate();
  const handleBack = () => {
    navigator("/Objectives");
  };
  return (
    <div>
      <button onClick={handleBack} className="flex">
        <ChevronLeft /> Back
      </button>
    </div>
  );
}

export default ObjectiveNavigator;
