import { useNavigate } from "react-router-dom";
import { Objective } from "../schemas/objective";
import { useObjectives } from "../services/objectives";
import { useQueryClient } from "react-query";
import { X } from "lucide-react";

type Props = {
  objective: Objective;
};

function Card({ objective }: Props) {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { remove } = useObjectives();

  const handleRemoveObjective = async (id: String) => {
    await remove(id);
    queryClient.invalidateQueries({ queryKey: ["objectives"] });
  };

  const handleOpenObjective = (id: String) => {
    navigation(`${id}`);
  };
  return (
    <div key={objective._id} className="p-4 bg-black text-white rounded-lg shadow flex gap-x-4">
      <h5
        className="cursor-pointer"
        onClick={() => {
          handleOpenObjective(objective._id);
        }}
      >
        {objective.name}
      </h5>
      <button onClick={() => handleRemoveObjective(objective._id)} className="hover:text-red-500">
        <X />
      </button>
    </div>
  );
}

export default Card;
