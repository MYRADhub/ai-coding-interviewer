type Props = {
  onClick: () => void;
  disabled: boolean;
};

export default function RunButton({ onClick, disabled }: Props) {
  return (
    <button className="bg-[var(--primary)] text-black text-sm px-3 py-1 rounded" onClick={onClick} disabled={disabled}>
      Run
    </button>
  );
}