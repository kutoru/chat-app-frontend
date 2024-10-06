import DefaultPfpIcon from "../../assets/default-pfp.svg?react";

type Props = {
  fromSelf: boolean;
  images: string[];
};

export default function Message({ fromSelf, images }: Props) {
  return (
    <div
      className={
        "bg-dark-3 w-[90%] h-fit rounded-md lg:w-[85%] xl:w-[80%]" +
        (fromSelf ? " ms-[10%] lg:ms-[15%] xl:ms-[20%]" : "")
      }
    >
      <div className="flex gap-1 m-1 lg:gap-2 lg:m-2">
        <div className="border-2 border-neutral-400 rounded-full flex-none size-10 p-1.5 xl:size-12">
          <DefaultPfpIcon className="fill-neutral-400" />
        </div>

        <div className="my-auto flex-1 overflow-hidden">
          <div className="text-base text-ellipsis overflow-hidden xl:text-lg">
            @usernamesdfasdfasdfasdfasdfasdasdfasdfc
          </div>
          <div className="text-xs text-neutral-400 xl:text-sm">
            2024/10/06 12:25:38
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-dark-1" />

      <div className="text-sm m-1 lg:m-2 xl:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        doloremque, quo repellendus quos iusto voluptatibus vitae eaque facilis
        porro quisquam.
      </div>

      {!!images.length && <div className="h-[2px] bg-dark-1" />}

      {!!images.length && (
        <div className="grid grid-flow-row grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <a
            href="http://192.168.1.12:3030/files/122937116_p0_master1200.jpg"
            target="_blank"
          >
            <img
              className="rounded-es-md w-full h-16 object-cover lg:h-20 xl:h-24"
              src="http://192.168.1.12:3030/files/122937116_p0_master1200.jpg"
            />
          </a>
          <a
            href="http://192.168.1.12:3030/files/122357897_p0_master1200.jpg"
            target="_blank"
          >
            <img
              className="rounded-es-md w-full h-16 object-cover lg:h-20 xl:h-24"
              src="http://192.168.1.12:3030/files/122357897_p0_master1200.jpg"
            />
          </a>
        </div>
      )}
    </div>
  );
}
