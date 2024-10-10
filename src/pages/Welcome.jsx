import Header from "../components/Header";

export function Welcome() {
  return (
    <>
      <Header />
      <div className="text-center ">
        <h1 className="text-2xl mt-4 mb-2">Welcome to Password Manager</h1>
        <h4>Create and store your passwords easily</h4>
      </div>
    </>
  );
}
