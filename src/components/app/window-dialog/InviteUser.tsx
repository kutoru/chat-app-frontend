import { useState } from "react";
import AddIcon from "../../../assets/add.svg?react";
import requests from "../../../requests";
import RoomPreview from "../../../types/RoomPreview";

type Props = {
  currRoom: RoomPreview | undefined;
};

export default function InviteUser({ currRoom }: Props) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [username, setUsername] = useState("");

  async function inviteNewUser() {
    setError(undefined);
    setSuccess(undefined);

    if (!currRoom || currRoom.type !== "group") {
      setError("Enter a group room to invite a user");
      return;
    }

    if (!username.length) {
      setError("Enter a username");
      return;
    }

    const result = await requests.roomsIdInvitePost(currRoom.id, {
      username: username,
    });
    if (!result.data) {
      setError(result.message);
      return;
    }

    setSuccess("The user has been invited");
    setUsername("");
  }

  return (
    <>
      <div className="text-2xl text-center mb-4 md:text-3xl md:mb-5">
        Invite a user to this group
      </div>

      {success && (
        <div className="text-green-400 mb-4 text-center md:mb-5">{success}</div>
      )}

      {error && (
        <div className="text-red-500 mb-4 text-center md:mb-5">{error}</div>
      )}

      <div className="flex gap-4 md:gap-5">
        <input
          type="text"
          placeholder="User to invite"
          value={username}
          onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
          className={
            "flex-1 bg-dark-3 p-2 rounded-md " +
            "focus:outline focus:outline-2 focus:outline-rose-600"
          }
        />

        <button
          onClick={inviteNewUser}
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
