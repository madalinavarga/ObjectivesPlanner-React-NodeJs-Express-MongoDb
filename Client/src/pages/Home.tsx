import { useQuery } from "react-query";

function Home() {
  const { isLoading, error, data } = useQuery("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {(error as any).message}</p>;

  return (
    <ul className="bg-blue-200 ">
      {data.map((todo: any) => (
        <li className="text-3xl font-bold underline" key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default Home;
