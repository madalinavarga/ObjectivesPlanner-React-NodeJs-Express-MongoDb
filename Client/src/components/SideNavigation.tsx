import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, XSquare } from "lucide-react";
import { useState } from "react";

import { CreateSection, Section } from "../schemas/section";
import SearchBar from "./SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import useSections from "../services/sections";

type Props = {
  setTargetSection: (section: Section) => void;
};

function SideNavigation({ ...props }: Props) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { getAll, create, remove } = useSections();
  const createMutation = useMutation(create);
  const removeMutation = useMutation(remove);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(2);

  const sectionsQuery = useQuery(["sections", debouncedSearch, page], () =>
    getAll({ name: debouncedSearch, page: `${page}` })
  );

  const handleObjectiveSelected = (section: Section) => {
    props.setTargetSection(section);
  };

  const handleAddSection = async () => {
    const section: CreateSection = {
      name: "New section",
    };
    createMutation.mutate(section, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      },
    });
  };

  const handleRemoveSection = async (section: Section) => {
    await removeMutation.mutateAsync(section._id);
    if (removeMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    }
  };

  const handleNextPage = async () => {
    if (page == 2) {
      return setPage(page);
    }
    setPage(page + 1);
  };

  const handlePreviousPage = async () => {
    if (page == 1) {
      setPage(page);
    }
    setPage(page - 1);
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
      <div className="flex gap-x-4 mt-8">
        <button
          className="bg-blue-400 px-2 hover:bg-blue-600 disabled:opacity-25"
          disabled={page == 1}
          onClick={handlePreviousPage}
        >
          Prev
        </button>
        <button
          className="bg-blue-400 px-2 hover:bg-blue-600 disabled:opacity-25"
          disabled={page == pageCount}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SideNavigation;
