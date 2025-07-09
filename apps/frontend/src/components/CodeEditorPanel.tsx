export default function CodeEditorPanel() {
  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col">
      <div className="flex justify-between mb-2">
        <button className="bg-[var(--primary)] text-black text-sm px-3 py-1 rounded">
          Run
        </button>
        <select className="bg-app-light border border-app rounded text-sm px-2 py-1">
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>
      <div className="flex-1 border border-app rounded bg-app-light p-2">
        <p>🧑‍💻 Code Editor Area</p>
      </div>
    </div>
  );
}
