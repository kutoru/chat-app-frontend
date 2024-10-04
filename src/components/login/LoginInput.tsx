import Person from "../../assets/person.svg?react";
import Key from "../../assets/key.svg?react";

type Props = {
  icon?: "profile" | "key";
  errorMessage?: string;
  inputPlaceholder: string;
  inputType: "text" | "password";
  inputValue: string;
  onInput: (newValue: string) => void;
};

export default function LoginInput({
  icon,
  errorMessage,
  inputPlaceholder,
  inputType,
  inputValue,
  onInput,
}: Props) {
  function getIcon() {
    switch (icon) {
      case "profile":
        return <Person className="h-12 w-10" />;
      case "key":
        return <Key className="rotate-45 h-12 w-10" />;
      default:
        return <div className="h-12 w-10" />;
    }
  }

  return (
    <div className="flex w-full mb-8 gap-4 md:mb-10">
      {getIcon()}

      <div className="relative w-full">
        {errorMessage && (
          <div className="absolute text-sm -mt-5 left-0 md:text-base md:-mt-6 text-red-500">
            {errorMessage}
          </div>
        )}

        <input
          type={inputType}
          placeholder={inputPlaceholder}
          value={inputValue}
          onInput={(e) => onInput((e.target as HTMLInputElement).value)}
          className={
            "w-full bg-dark-3 p-3 rounded-md " +
            "focus:outline focus:outline-2 focus:outline-rose-600"
          }
        />
      </div>
    </div>
  );
}
