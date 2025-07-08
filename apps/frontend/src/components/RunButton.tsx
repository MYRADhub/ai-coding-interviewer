type Props = {
  onClick: () => void;
};

export default function RunButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="bg-[var(--primary)] text-black py-2 px-4 rounded font-semibold">
      Run
    </button>
  );
}