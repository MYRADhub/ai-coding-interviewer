import Editor from "@monaco-editor/react";
import type { Language } from "../utils/types";
import { useTheme } from "../context/ThemeContext";

type Props = {
  value: string;
  language: Language;
  onChange: (value: string | undefined) => void;
};

export default function CodeEditor({ value, onChange, language }: Props) {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      language={language}
      theme={theme === "dark" ? "vs-dark" : "light"}
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
