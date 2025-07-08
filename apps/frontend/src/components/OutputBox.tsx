type Props = {
  output: string;
};

export default function OutputBox({ output }: Props) {
  return (
    <div className="bg-app-light text-app p-4 rounded text-sm mt-2 border border-app">
      <strong className="text-app">Output:</strong> <br />
      {output}
    </div>
  );
}