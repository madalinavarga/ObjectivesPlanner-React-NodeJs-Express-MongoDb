import { useParams } from "react-router-dom";
import { getById } from "../services/objectives";
import { useQuery } from "react-query";
import { Objective } from "../schemas/objective";
import Layout from "../components/Layout";
import ObjectiveNavigator from "../components/ObjectiveNavigator";

function Objective() {
  const params = useParams();
  const objectiveQuery = useQuery<Objective>(["objective"], () => getById(params.id!), {
    enabled: !!params?.id,
  });

  return (
    <Layout leftContent={<ObjectiveNavigator />}>
      <div className="p-4 text-white flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl mb-8"> {objectiveQuery.data?.name}</h1>
          <label className="p-4 rounded bg-gray-600">Status: <p>{objectiveQuery.data?.status}</p></label>
        </div>
        <label className="text-xl">Description:</label>
        <p className="p-4 bg-gray-600 rounded">{objectiveQuery.data?.description}</p>
        <label className="text-xl">Linkuri:</label>
        <p>{objectiveQuery.data?.links}</p>
      </div>
    </Layout>
  );
}

export default Objective;
