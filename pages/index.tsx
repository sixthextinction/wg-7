import { NextPage } from "next";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";
import { useState } from "react";

const Home: NextPage = () => {
  const [artistQuery, setArtistQuery] = useState<string>("kylie+minogue");
  const [searchTerm, setSearchTerm] = useState<string>("kylie minogue");
  const { data, mutate, isLoading } = useQuery({
    operationName: "users/get",
    input: {
      artist: artistQuery,
    },
  });

  // event handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // essentially "submit" a query
    setArtistQuery(searchTerm);
  };

  return (
    <>
      <div className="text-cyan-400 dark:text-white overflow-x-clip overflow-y-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex border-b border-teal-500 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="appearance-none bg-transparent border-none w-full dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
        {isLoading ? (
          <p className="text-white font-xl"> Loading...</p>
        ) : data?.success ? (
          <>
            <div className="flex items-center justify-center h-full w-full mx-5 my-5 grid grid-cols-4 lg:grid-cols-8 gap-x-0 gap-y-8">
              {data?.albums?.results.map((album) => (
                <a href={album?.collectionViewUrl}>
                  <img
                    key={album?.collectionId}
                    src={album?.artworkUrl100}
                    className="h-48 object-cover hover:scale-110"
                    alt={album?.collectionName}
                    title={album?.artistName + "\n" + album?.collectionName}
                  />
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center h-full w-full mx-5 my-5">
              <strong> Bad data!</strong>
            </div>
          </>
        )}
        {/* <pre className="overflow-x-auto">{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default withWunderGraph(Home);
