type Props = {
  onClick: () => void;
};

export default function RunButton({ onClick }: Props) {
  return (
    <button className="bg-[var(--primary)] text-black text-sm px-3 py-1 rounded" onClick={onClick}>
      Run
    </button>
  );
}