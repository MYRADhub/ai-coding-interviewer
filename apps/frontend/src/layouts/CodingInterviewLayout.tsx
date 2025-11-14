import { useCallback, useEffect, useRef, useState } from "react";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import ChatPanel from "../components/ChatPanel";
import OutputPanel from "../components/OutputPanel";

const MIN_LEFT_WIDTH = 260;
const MIN_RIGHT_WIDTH = 400;
const MIN_TOP_HEIGHT = 180;
const MIN_BOTTOM_HEIGHT = 160;
const COLLAPSED_HEIGHT = 52;

export default function CodingInterviewLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);

  const [leftWidth, setLeftWidth] = useState(38); // percentage
  const [topHeight, setTopHeight] = useState(60); // percentage of left pane height
  const [bottomHeight, setBottomHeight] = useState(260);
  const [outputOpen, setOutputOpen] = useState(true);

  const isDragging = useRef<{
    vertical?: boolean;
    horizontal?: boolean;
    output?: boolean;
  }>({});

  const startDrag = (type: "vertical" | "horizontal" | "output") => {
    isDragging.current[type] = true;
  };

  const stopDrag = () => {
    isDragging.current = {};
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const container = containerRef.current;
      const leftPane = leftPaneRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      if (isDragging.current.vertical) {
        const relativeX = event.clientX - rect.left;
        const minWidth = MIN_LEFT_WIDTH;
        const maxWidth = rect.width - MIN_RIGHT_WIDTH;
        const clamped = Math.min(Math.max(relativeX, minWidth), maxWidth);
        setLeftWidth((clamped / rect.width) * 100);
      }

      if (isDragging.current.horizontal && leftPane) {
        const leftRect = leftPane.getBoundingClientRect();
        const relativeY = event.clientY - leftRect.top;
        const minHeight = MIN_TOP_HEIGHT;
        const maxHeight = leftRect.height - MIN_TOP_HEIGHT;
        const clamped = Math.min(Math.max(relativeY, minHeight), maxHeight);
        setTopHeight((clamped / leftRect.height) * 100);
      }

      if (isDragging.current.output) {
        const relativeY = rect.bottom - event.clientY;
        const clamped = Math.max(MIN_BOTTOM_HEIGHT, Math.min(relativeY, rect.height - 120));
        setBottomHeight(clamped);
        if (relativeY <= COLLAPSED_HEIGHT + 20) {
          setOutputOpen(false);
        } else {
          setOutputOpen(true);
        }
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mouseleave", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("mouseleave", stopDrag);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-app text-app"
      style={{ paddingBottom: outputOpen ? bottomHeight + 24 : COLLAPSED_HEIGHT + 24 }}
    >
      <div className="flex h-full w-full">
        <div
          ref={leftPaneRef}
          className="flex flex-col space-y-4 pr-4"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="flex-1 min-h-0" style={{ height: `${topHeight}%` }}>
            <ProblemPanel />
          </div>
          <div
            className="h-2 cursor-row-resize rounded-full bg-white/10 hover:bg-white/25"
            onMouseDown={() => startDrag("horizontal")}
          />
          <div className="flex-1 min-h-0">
            <ChatPanel />
          </div>
        </div>

        <div
          className="h-full"
          style={{ width: `calc(100% - ${leftWidth}%)` }}
        >
          <CodeEditorPanel />
        </div>

        <div
          className="absolute inset-y-6"
          style={{ left: `calc(${leftWidth}% - 6px)` }}
        >
          <div
            className="w-3 h-full cursor-col-resize rounded-full bg-white/10 hover:bg-white/25"
            onMouseDown={() => startDrag("vertical")}
          />
        </div>
      </div>

      <div
        className={`absolute left-1/2 bottom-4 z-20 w-[92%] -translate-x-1/2 rounded-xl border border-app bg-app-dark transition-[height] ${
          outputOpen ? "overflow-hidden" : "overflow-visible"
        }`}
        style={{ height: outputOpen ? bottomHeight : COLLAPSED_HEIGHT }}
      >
        <div
          className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-[0.2em] text-app-muted cursor-row-resize border-b border-app"
          onMouseDown={() => startDrag("output")}
        >
          <span>{outputOpen ? "Test Results" : "Tap to expand test results"}</span>
          <button
            type="button"
            className="text-[var(--primary)] text-[0.65rem] tracking-widest"
            onClick={(e) => {
              e.stopPropagation();
              setOutputOpen((prev) => !prev);
            }}
          >
            {outputOpen ? "Collapse" : "Expand"}
          </button>
        </div>
        {outputOpen && (
          <div className="h-full overflow-auto p-3">
            <OutputPanel />
          </div>
        )}
      </div>
    </div>
  );
}
