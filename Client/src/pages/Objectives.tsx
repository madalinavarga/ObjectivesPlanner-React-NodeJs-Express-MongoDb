import { Suspense, useState } from "react";
import { PlusCircle } from "lucide-react";

import SideNavigation from "../components/SideNavigation";
import { Section } from "../schemas/section";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import EditableCard from "../components/EditableCard";
import Spinner from "../components/Spinner";
import ObjectivesCard from "../components/ObjectivesCards";

function Objectives() {
  const [targetSection, setTargetSection] = useState<Section>();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddObjective = () => {
    setModalOpen(true);
  };

  return (
    <Layout leftContent={<SideNavigation setTargetSection={setTargetSection} />}>
      <Suspense fallback={<Spinner />}>
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
          <ObjectivesCard targetSection={targetSection} />
          {targetSection && (
            <Modal
              setModalOpen={setModalOpen}
              isModalOpen={isModalOpen}
              targetSectionId={targetSection._id}
            />
          )}
        </div>
      </Suspense>
    </Layout>
  );
}

export default Objectives;
