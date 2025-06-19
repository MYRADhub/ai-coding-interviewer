type Props = {
  onClick: () => void;
};

export default function RunButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="my-2 px-4 py-2 bg-blue-600 text-white rounded">
      Run
    </button>
  );
}