import { useQuery } from "react-query";

import { create, getAll, remove } from "../services/sections";
import { CreateSection, Section } from "../schemas/section";

type Props = {
  setTargetSection: (section: Section) => void;
};

function SideNavigation({ ...props }: Props) {
  const sectionsQuery = useQuery("sections", getAll);

  const handleObjectiveSelected = (section: Section) => {
    props.setTargetSection(section);
  };

  const handleAddSection = async () => {
    const section: CreateSection = {
      name: "New section",
    };
    await create(section);
    sectionsQuery.refetch();
  };

  const handleRemoveSection = async (section: Section) => {
    console.log("remove");
    await remove(section._id);
    sectionsQuery.refetch();
  };

  return (
    <div className="bg-gray-700 text-white h-[100vh]">
      <h1>Objectives planner</h1>
      {<button onClick={handleAddSection}>Add +</button>}
      <ul>
        {sectionsQuery.data?.map((section: Section) => (
          <div key={section._id} className="flex flex-row gap-x-8">
            <li onClick={() => handleObjectiveSelected(section)} className="cursor-pointer">
              {section.name}
            </li>
            <button className="cursor-pointer" onClick={() => handleRemoveSection(section)}>
              X
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
