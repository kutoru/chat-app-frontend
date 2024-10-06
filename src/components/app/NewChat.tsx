import { useEffect, useState } from "react";
import SendIcon from "../../assets/send.svg?react";
import AddIcon from "../../assets/add.svg?react";

export default function NewChat() {
  const [userError, setUserError] = useState<string | undefined>();
  const [username, setUsername] = useState("");
  const [groupError, setGroupError] = useState<string | undefined>();
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    // setUserError("Such user does not exist");
    // setGroupError("Group name cannot be empty");
  }, []);

  return (
    <>
      <div className="text-2xl text-center mb-4 md:text-3xl md:mb-5">
        Start a new chat
      </div>

      {userError && (
        <div className="text-red-500 mb-4 text-center md:mb-5">{userError}</div>
      )}

      <div className="flex gap-4 md:gap-5">
        <input
          type="text"
          placeholder="User to chat with"
          value={username}
          onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
          className={
            "flex-1 bg-dark-3 p-2 rounded-md " +
            "focus:outline focus:outline-2 focus:outline-rose-600"
          }
        />

        <button
          className={
            "group/btn size-10 p-1 transition-all rounded-md bg-rose-600 flex-none " +
            "hover:bg-rose-700 active:bg-rose-800"
          }
        >
          <SendIcon className="rotate-[-25deg] -translate-y-0.5 translate-x-[1px] size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>

      <div className="bg-rose-600 h-[3px] rounded-full my-8 md:my-10" />

      <div className="text-2xl text-center mb-4 md:text-3xl md:mb-5">
        Or create a group
      </div>

      {groupError && (
        <div className="text-red-500 mb-4 text-center md:mb-5">
          {groupError}
        </div>
      )}

      <div className="flex gap-4 md:gap-5">
        <input
          type="text"
          placeholder="New group name"
          value={groupName}
          onInput={(e) => setGroupName((e.target as HTMLInputElement).value)}
          className={
            "flex-1 bg-dark-3 p-2 rounded-md " +
            "focus:outline focus:outline-2 focus:outline-rose-600"
          }
        />

        <button
          className={
            "group/btn size-10 p-1 transition-all rounded-md bg-rose-600 flex-none " +
            "hover:bg-rose-700 active:bg-rose-800"
          }
        >
          <AddIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>
    </>
  );
}
