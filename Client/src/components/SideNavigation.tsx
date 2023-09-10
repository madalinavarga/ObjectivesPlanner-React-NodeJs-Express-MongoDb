import { useQuery } from "react-query";

import { getAll } from "../services/sections";
import { Section } from "../schemas/section";

type Props = {
  setTargetSection: (section: Section) => void;
};

function SideNavigation({ ...props }: Props) {
  const sectionsQuery = useQuery("sections", getAll);

  const handleObjectives = (section: Section) => {
    props.setTargetSection(section);
  };

  return (
    <div className="bg-gray-700 text-white h-[100vh]">
      <h1>Objectives planner</h1>
      <ul>
        {sectionsQuery.data?.map((section: Section) => (
          <li
            key={section._id}
            onClick={() => handleObjectives(section)}
            className="cursor-pointer"
          >
            {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
