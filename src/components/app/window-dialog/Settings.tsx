import { useState } from "react";
import DefaultPfpIcon from "../../../assets/default-pfp.svg?react";
import EditIcon from "../../../assets/edit.svg?react";
import requests from "../../../requests";
import User from "../../../types/User";
import { formatDate } from "../../../utils";
import global from "../../../global";
import LogoutIcon from "../../../assets/logout.svg?react";

type Props = {
  userInfo: User | undefined;
  setUserInfo: (v: User) => void;
  navigate: (v: string) => void;
};

export default function Settings({ userInfo, setUserInfo, navigate }: Props) {
  const [pfpError, setPfpError] = useState<string>();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPass, setRepeatedPass] = useState("");
  const [passError, setPassError] = useState<string>();
  const [passSuccess, setPassSuccess] = useState<string>();

  async function uploadImage() {
    if (!userInfo) {
      return;
    }

    setPfpError(undefined);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    const file: File | undefined = await new Promise((resolve) => {
      input.onchange = (e: Event) => {
        resolve((e.target as HTMLInputElement | null)?.files?.[0]);
      };
    });

    if (!file) {
      return;
    }

    const fileResult = await requests.filesPfpPost(file);
    if (fileResult.message) {
      setPfpError(fileResult.message);
      return;
    }

    setUserInfo({
      username: userInfo.username,
      created: userInfo.created,
      profile_image: fileResult.data,
    });
  }

  async function changePassword() {
    setPassError(undefined);
    setPassSuccess(undefined);

    if (!password) {
      setPassError("Enter your current password");
      return;
    }

    if (!newPassword) {
      setPassError("Enter a new password");
      return;
    }

    if (newPassword.length < 4) {
      setPassError("The new password is too short");
      return;
    }

    if (!repeatedPass) {
      setPassError("Re-enter the new password");
      return;
    }

    if (repeatedPass !== newPassword) {
      setPassError("The new passwords don't match");
      return;
    }

    const result = await requests.updatePassword({
      oldPassword: password,
      newPassword: newPassword,
    });
    if (result.message) {
      setPassError(result.message);
      return;
    }

    setPassSuccess("The password has been successfully updated");
    setPassword("");
    setNewPassword("");
    setRepeatedPass("");
  }

  async function logOut() {
    const result = await requests.logout();
    if (result.message) {
      setPassError(result.message);
      return;
    }

    navigate("/login");
  }

  return (
    <>
      <div className="text-2xl text-center mb-4 md:text-3xl md:mb-5">
        Your profile
      </div>

      {pfpError && (
        <div className="text-red-500 mb-4 text-center md:mb-5">{pfpError}</div>
      )}

      <div className="flex mb-4 gap-4 md:mb-5 md:gap-6">
        <div
          onClick={uploadImage}
          className="relative group/pfp cursor-pointer"
        >
          <button
            className={
              "bg-rose-600 absolute -ms-1 -mt-1 top-0 left-0 size-6 rounded-full p-1 transition-all md:size-7 md:-ms-1.5 md:-mt-1.5" +
              " group-hover/pfp:bg-rose-700 group-active/pfp:bg-rose-800"
            }
          >
            <EditIcon
              className={
                "size-full transition-all" +
                "  group-hover/pfp:fill-neutral-300 group-active/pfp:fill-neutral-400"
              }
            />
          </button>

          <div
            className={
              "border-2 border-neutral-400 rounded-full size-14 flex-none md:size-16" +
              (!userInfo?.profile_image ? " p-1.5" : "")
            }
          >
            {!userInfo?.profile_image ? (
              <DefaultPfpIcon className="fill-neutral-400" />
            ) : (
              <img
                className="rounded-full object-cover"
                src={global.API_URL + "/files/" + userInfo.profile_image}
              />
            )}
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="my-auto">
            <div className="md:text-xl">
              @{userInfo ? userInfo.username : " -"}
            </div>
            <div className="text-sm text-neutral-400 md:text-base">
              Account created: {userInfo ? formatDate(userInfo.created) : "-"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-600 h-[3px] rounded-full my-8 md:my-10" />

      <div className="text-2xl text-center mb-4 md:text-3xl md:mb-5">
        Change your password
      </div>

      {passSuccess && (
        <div className="text-green-400 mb-4 text-center md:mb-5">
          {passSuccess}
        </div>
      )}

      {passError && (
        <div className="text-red-500 mb-4 text-center md:mb-5">{passError}</div>
      )}

      <input
        type="password"
        placeholder="Old password"
        value={password}
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        className={
          "w-full bg-dark-3 p-2 rounded-md mb-4 md:mb-5 " +
          "focus:outline focus:outline-2 focus:outline-rose-600"
        }
      />

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onInput={(e) => setNewPassword((e.target as HTMLInputElement).value)}
        className={
          "w-full bg-dark-3 p-2 rounded-md mb-4 md:mb-5 " +
          "focus:outline focus:outline-2 focus:outline-rose-600"
        }
      />

      <input
        type="password"
        placeholder="Repeat password"
        value={repeatedPass}
        onInput={(e) => setRepeatedPass((e.target as HTMLInputElement).value)}
        className={
          "w-full bg-dark-3 p-2 rounded-md mb-4 md:mb-5 " +
          "focus:outline focus:outline-2 focus:outline-rose-600"
        }
      />

      <div className="flex">
        <button
          onClick={logOut}
          className={
            "text-rose-500 py-2 px-4 rounded-md transition-all flex" +
            " group/btn hover:text-rose-600 hover:bg-[#00000020] active:text-rose-700 active:bg-[#00000030]"
          }
        >
          <LogoutIcon className="size-6 transition-all fill-rose-500 group-hover/btn:fill-rose-600 group-active/btn:fill-rose-700" />
          <span className="ms-1 my-auto">Log out</span>
        </button>

        <div className="flex-1" />

        <button
          onClick={changePassword}
          className={
            "bg-rose-600 py-2 px-4 rounded-md transition-all " +
            "hover:bg-rose-700 hover:text-neutral-300 active:bg-rose-800 active:text-neutral-400"
          }
        >
          Change
        </button>
      </div>
    </>
  );
}
