
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="bg-cover bg-center w-full h-64"
        style={{
          backgroundImage: "url('https://i.ibb.co/1d8KHx3/4660894-2456051.jpg')",
        }}
      ></div>
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mt-4">We are sorry, but an error occurred.</p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
