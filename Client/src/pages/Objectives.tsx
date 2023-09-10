import { useQuery } from "react-query";
import { useState } from "react";
import { getAllBySection } from "../services/objectives";
import { Objective } from "../schemas/objective";
import SideNavigation from "../components/SideNavigation";
import { Section } from "../schemas/section";

function Objectives() {
  const [targetSection, setTargetSection] = useState<Section>();

  const objectivesQuery = useQuery("objectives", () => getAllBySection(targetSection?._id!), {
    enabled: targetSection?._id ? true : false,
  });

  return (
    <div className="bg-gray-500 grid  grid-cols-[1fr,3fr] h-[100vh]">
      <SideNavigation setTargetSection={setTargetSection} />
      <div>
        <h1>Section: {targetSection?.name}</h1>
        <ul className="flex">
          {objectivesQuery.data?.map((objective: Objective) => {
            return (
              <li className="bg-gray-400 p-4" key={objective._id}>
                {objective.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Objectives;
