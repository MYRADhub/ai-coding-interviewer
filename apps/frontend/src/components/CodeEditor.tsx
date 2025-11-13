import Editor from "@monaco-editor/react";
import type { Language } from "../utils/types";

type Props = {
  value: string;
  language: Language;
  onChange: (value: string | undefined) => void;
};

export default function CodeEditor({ value, onChange, language }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      language={language}
      theme="vs-dark"
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
