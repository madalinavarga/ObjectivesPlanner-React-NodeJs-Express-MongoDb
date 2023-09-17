import { useQuery } from "react-query";
import { PlusCircle, XSquare } from "lucide-react";
import { useState } from "react";

import { create, getAll, remove } from "../services/sections";
import { CreateSection, Section } from "../schemas/section";
import SearchBar from "./SearchBar";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  setTargetSection: (section: Section) => void;
};

function SideNavigation({ ...props }: Props) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const sectionsQuery = useQuery(["sections", debouncedSearch], () =>
    getAll({ name: debouncedSearch })
  );

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
    await remove(section._id);
    sectionsQuery.refetch();
  };

  return (
    <div className="bg-gray-700 text-white h-[100vh]">
      <div className="flex justify-between pb-8">
        <h1 className="text-xl">Objectives planner</h1>
        <button onClick={handleAddSection} className="hover:text-yellow-400">
          <PlusCircle />
        </button>
      </div>
      <SearchBar onChange={setSearch} />
      <ul className="flex flex-col gap-y-4">
        {sectionsQuery.data?.map((section: Section) => (
          <div key={section._id} className="flex flex-row gap-x-4">
            <li onClick={() => handleObjectiveSelected(section)} className="cursor-pointer">
              {section.name}
            </li>
            <button
              className="cursor-pointer hover:text-red-600"
              onClick={() => handleRemoveSection(section)}
            >
              <XSquare />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
