type Props = {
  isError: boolean;
};

export default function SystemMessage({ isError }: Props) {
  return (
    <div className="w-full text-center my-2">
      {isError ? (
        <div className="text-red-500 xl:text-lg">
          Could not send the message
        </div>
      ) : (
        <>
          <div className="text-lg text-neutral-400 xl:text-xl">
            Chat has been created
          </div>
          <div className="text-sm text-neutral-500 xl:text-base">
            2024/10/06 13:11:39
          </div>
        </>
      )}
    </div>
  );
}
