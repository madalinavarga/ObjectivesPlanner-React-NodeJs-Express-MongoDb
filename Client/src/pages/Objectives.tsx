import { useQuery } from "react-query";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { useObjectives } from "../services/objectives";
import { Objective } from "../schemas/objective";
import SideNavigation from "../components/SideNavigation";
import { Section } from "../schemas/section";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import Card from "../components/Card";
import EditableCard from "../components/EditableCard";

function Objectives() {
  const [targetSection, setTargetSection] = useState<Section>();
  const [isModalOpen, setModalOpen] = useState(false);
  const { getAllBySection } = useObjectives();

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

  return (
    <Layout leftContent={<SideNavigation setTargetSection={setTargetSection} />}>
      <div className="p-4">
        <div className="flex flex-row gap-16 mb-8">
          {targetSection?.name && (
            <h1 className="text-xl flex gap-x-4">
              Section: <EditableCard section={targetSection} />
            </h1>
          )}
          {targetSection && (
            <button onClick={handleAddObjective} className="hover:text-yellow-400">
              <PlusCircle />
            </button>
          )}
        </div>
        <ul className="flex gap-x-8">
          {objectivesQuery.data?.map((objective: Objective) => {
            return (
              <div className="flex flex-row gap-x-4">
                <Card objective={objective} />
              </div>
            );
          })}
        </ul>
        {targetSection && (
          <Modal
            setModalOpen={setModalOpen}
            isModalOpen={isModalOpen}
            targetSectionId={targetSection._id}
          />
        )}
      </div>
    </Layout>
  );
}

export default Objectives;
