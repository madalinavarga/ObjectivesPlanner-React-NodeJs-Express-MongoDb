import { useQuery } from "react-query";
import { useState } from "react";
import { getAllBySection, remove } from "../services/objectives";
import { Objective } from "../schemas/objective";
import SideNavigation from "../components/SideNavigation";
import { Section } from "../schemas/section";
import Modal from "../components/Modal";

function Objectives() {
  const [targetSection, setTargetSection] = useState<Section>();
  const [isModalOpen, setModalOpen] = useState(false);

  const objectivesQuery = useQuery(
    ["objectives", targetSection?._id],
    () => getAllBySection(targetSection?._id!),
    {
      enabled: targetSection?._id ? true : false,
    }
  );

  const handleAddObjective = () => {
    setModalOpen(true);
  };

  const handleRemoveObjective = async (id: String) => {
    await remove(id);
    objectivesQuery.refetch();
  };

  return (
    <div className="bg-gray-500 grid grid-cols-[1fr,3fr] h-[100vh]">
      <SideNavigation setTargetSection={setTargetSection} />
      <div>
        {targetSection && (
          <Modal
            setModalOpen={setModalOpen}
            isModalOpen={isModalOpen}
            targetSectionId={targetSection._id}
          />
        )}
        <h1>Section: {targetSection?.name}</h1>
        {targetSection && <button onClick={handleAddObjective}>Add +</button>}
        <ul className="flex gap-x-8">
          {objectivesQuery.data?.map((objective: Objective) => {
            return (
              <div key={objective._id} className="flex flex-row bg-gray-400 p-4 gap-x-4">
                <li className="">{objective.name}</li>
                <button onClick={() => handleRemoveObjective(objective._id)}>X</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Objectives;
