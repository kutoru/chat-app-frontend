import { useRouteError } from "react-router-dom";

export default function Error() {
  const error: any = useRouteError();
  //   console.error(error);

  return (
    <div className="flex h-dvh">
      <div className="bg-dark-2 shadow-md border-t-4 border-rose-600 py-12 h-fit w-full m-auto text-center md:w-fit md:p-24 md:rounded-xl">
        {error.status && <h1 className="text-5xl mb-4">{error.status}</h1>}
        {error.statusText && <h1 className="text-4xl">{error.statusText}</h1>}
        {!error.statusText && (
          <h1 className="text-2xl">Error: {error.message}</h1>
        )}
      </div>
    </div>
  );
}
