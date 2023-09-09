import { useQuery } from "react-query";

function Home() {
  const { isLoading, error, data } = useQuery("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {(error as any).message}</p>;

  return (
    <ul>
      {data.map((todo: any) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default Home;
