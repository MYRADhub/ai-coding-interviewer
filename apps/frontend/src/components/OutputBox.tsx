type Props = {
  output: string;
};

export default function OutputBox({ output }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded text-sm mt-2">
      <strong>Output:</strong> <br />
      {output}
    </div>
  );
}