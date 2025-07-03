import Editor from "@monaco-editor/react";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
};

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      theme="vs-light"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}
