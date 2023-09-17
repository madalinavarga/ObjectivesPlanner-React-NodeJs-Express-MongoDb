type Props = {
  leftContent: React.ReactNode;
  children: React.ReactNode;
};

function Layout({ leftContent, children }: Props) {
  return (
    <div className="bg-gray-500 grid grid-cols-[1fr,3fr] h-[100vh]">
      <div className="bg-gray-700 text-white h-[100vh] p-4">{leftContent}</div>
      {children}
    </div>
  );
}

export default Layout;
