type Props = {
  headerHeight: number;
};

export default function ChatContainer({ headerHeight }: Props) {
  return (
    <div
      className="bg-dark-1 flex-1 flex"
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
    >
      <div className="size-fit m-auto text-4xl">Chat container</div>
    </div>
  );
}
