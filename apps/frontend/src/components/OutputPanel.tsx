export default function OutputPanel() {
  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col">
      <div className="flex gap-2 mb-2">
        <div className="bg-app-light border border-app text-sm px-3 py-1 rounded cursor-pointer">
          Test 1
        </div>
        <div className="bg-app-light border border-app text-sm px-3 py-1 rounded cursor-pointer opacity-50">
          + Add
        </div>
      </div>
      <div className="flex-1 bg-app-light border border-app rounded p-2">
        <p>🧪 Output Area</p>
      </div>
    </div>
  );
}
