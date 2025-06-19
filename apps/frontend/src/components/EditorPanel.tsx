import { useState } from 'react';
import CodeEditor from './CodeEditor';
import RunButton from './RunButton';
import OutputBox from './OutputBox';

export default function EditorPanel() {
  const [output, setOutput] = useState('');

  const runCode = () => {
    setOutput('✅ Test passed! (simulated)');
  };

  return (
    <div className="w-1/2 p-4 flex flex-col">
      <CodeEditor />
      <RunButton onClick={runCode} />
      <OutputBox output={output} />
    </div>
  );
}