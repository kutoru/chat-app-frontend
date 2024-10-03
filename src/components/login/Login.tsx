import Key from "../../assets/key.svg?react";
import Person from "../../assets/person.svg?react";

export default function Login() {
  return (
    <div className="flex h-dvh">
      <div
        className={
          "bg-dark-2 shadow-md border-t-4 border-rose-600 px-4 py-8 h-fit w-full m-auto " +
          "md:w-[600px] md:p-16 md:rounded-xl"
        }
      >
        <h1 className="text-4xl text-center mb-8 leading-tight md:mb-10">
          Log in to the <br className="md:hidden" />
          chat app
        </h1>

        <div className="flex w-full mb-8 gap-4 md:mb-10">
          <Person className="h-12 w-10" />
          <input
            type="text"
            placeholder="Username"
            className={
              "w-full bg-dark-3 p-3 rounded-md " +
              "focus:outline focus:outline-2 focus:outline-rose-600"
            }
          />
        </div>

        <div className="flex w-full mb-8 gap-4 md:mb-10">
          <Key className="rotate-45 h-12 w-10" />
          <input
            type="password"
            placeholder="Password"
            className={
              "w-full bg-dark-3 p-3 rounded-md " +
              "focus:outline focus:outline-2 focus:outline-rose-600"
            }
          />
        </div>

        <div className=" flex">
          <button
            className={
              "text-rose-500 py-2 px-4 rounded-md transition-all " +
              "hover:text-rose-600 hover:bg-[#00000020] active:text-rose-700 active:bg-[#00000030]"
            }
          >
            Or register
          </button>

          <div className="flex-1" />

          <button
            type="button"
            className={
              "bg-rose-600 py-2 px-4 rounded-md transition-all " +
              "hover:bg-rose-700 hover:text-neutral-300 active:bg-rose-800 active:text-neutral-400"
            }
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
