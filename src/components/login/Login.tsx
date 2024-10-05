import { useState } from "react";
import LoginInput from "./LoginInput";
import requests from "../../requests";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPass, setRepeatedPass] = useState("");

  const [usernameWarn, setUsernameWarn] = useState("");
  const [passwordWarn, setPasswordWarn] = useState("");
  const [repeatedPassWarn, setRepeatedPassWarn] = useState("");
  const [generalWarn, setGeneralWarn] = useState("");

  function toggleRegister() {
    setUsernameWarn("");
    setPasswordWarn("");
    setRepeatedPassWarn("");
    setGeneralWarn("");

    setPassword("");
    setRepeatedPass("");

    setIsRegister(!isRegister);
  }

  async function logIn() {
    let abort = false;

    setUsernameWarn("");
    setPasswordWarn("");
    setGeneralWarn("");

    if (username.length < 4) {
      setUsernameWarn("Username is too short");
      abort = true;
    }

    if (password.length < 4) {
      setPasswordWarn("Password is too short");
      abort = true;
    }

    if (abort) {
      return;
    }

    const result = await requests.login({
      username: username,
      password: password,
    });

    if (result.message) {
      setGeneralWarn(result.message);
      return;
    }

    navigate("/");
  }

  async function register() {
    let abort = false;

    setUsernameWarn("");
    setPasswordWarn("");
    setRepeatedPassWarn("");
    setGeneralWarn("");

    if (username.length < 4) {
      setUsernameWarn("Username is too short");
      abort = true;
    }

    if (password.length < 4) {
      setPasswordWarn("Password is too short");
      abort = true;
    }

    if (password !== repeatedPass) {
      setRepeatedPassWarn("Passwords don't match");
      abort = true;
    }

    if (abort) {
      return;
    }

    const result = await requests.register({
      username: username,
      password: password,
    });

    if (result.message) {
      setGeneralWarn(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="flex h-dvh">
      <div
        className={
          "bg-dark-2 shadow-md border-t-4 border-rose-600 px-4 py-8 h-fit w-full m-auto " +
          "md:w-[600px] md:p-16 md:rounded-xl"
        }
      >
        <h1 className="text-4xl text-center mb-8 leading-tight md:mb-10">
          {!isRegister ? (
            <>
              Log in to the <br className="md:hidden" />
              chat app
            </>
          ) : (
            <>Create a new account</>
          )}
        </h1>

        {generalWarn && (
          <div className="text-red-500 mb-8 text-center text-lg">
            {generalWarn}
          </div>
        )}

        <LoginInput
          icon="profile"
          errorMessage={usernameWarn}
          inputType="text"
          inputPlaceholder="Username"
          inputValue={username}
          onInput={(val) => setUsername(val)}
        />

        <LoginInput
          icon="key"
          errorMessage={passwordWarn}
          inputType="password"
          inputPlaceholder="Password"
          inputValue={password}
          onInput={(val) => setPassword(val)}
        />

        {isRegister && (
          <LoginInput
            errorMessage={repeatedPassWarn}
            inputType="password"
            inputPlaceholder="Repeat password"
            inputValue={repeatedPass}
            onInput={(val) => setRepeatedPass(val)}
          />
        )}

        <div className="flex">
          <button
            onClick={toggleRegister}
            className={
              "text-rose-500 py-2 px-4 rounded-md transition-all " +
              "hover:text-rose-600 hover:bg-[#00000020] active:text-rose-700 active:bg-[#00000030]"
            }
          >
            {!isRegister ? <>Or register</> : <>Or log in</>}
          </button>

          <div className="flex-1" />

          <button
            onClick={!isRegister ? logIn : register}
            type="button"
            className={
              "bg-rose-600 py-2 px-4 rounded-md transition-all " +
              "hover:bg-rose-700 hover:text-neutral-300 active:bg-rose-800 active:text-neutral-400"
            }
          >
            {!isRegister ? <>Log In</> : <>Register</>}
          </button>
        </div>
      </div>
    </div>
  );
}
