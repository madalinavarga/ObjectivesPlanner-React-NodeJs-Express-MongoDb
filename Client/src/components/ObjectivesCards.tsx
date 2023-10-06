import { useQuery } from "@tanstack/react-query";
import { Objective } from "../schemas/objective";
import Card from "./Card";
import { useObjectives } from "../services/objectives";
import { Section } from "../schemas/section";

type Props = {
  targetSection: Section | undefined;
};
function ObjectivesCard({ targetSection }: Props) {
  const { getAllBySection } = useObjectives();

  const objectivesQuery = useQuery(
    ["objectives", targetSection?._id],
    () => getAllBySection(targetSection?._id!),
    {
      enabled: targetSection?._id ? true : false,
    }
  );

  return (
    <ul className="flex gap-x-8">
      {objectivesQuery.data?.map((objective: Objective) => {
        return (
          <div className="flex flex-row gap-x-4">
            <Card objective={objective} />
          </div>
        );
      })}
    </ul>
  );
}

export default ObjectivesCard;
