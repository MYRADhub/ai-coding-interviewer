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
      style={{ paddingBottom: outputOpen ? bottomHeight + 16 : COLLAPSED_HEIGHT + 16 }}
    >
      <div className="flex h-full w-full px-3 py-2 gap-2">
        <div
          ref={leftPaneRef}
          className="flex flex-col gap-2 pr-2 h-full"
          style={{ width: `${leftWidth}%` }}
        >
          <div
            className="flex-none min-h-[160px]"
            style={{ flexBasis: `${topHeight}%` }}
          >
            <ProblemPanel />
          </div>
          <div
            className="h-1 cursor-row-resize rounded bg-[var(--border)] hover:bg-[color-mix(in_srgb,var(--border),#000_10%)] transition"
            onMouseDown={() => startDrag("horizontal")}
          />
          <div
            className="flex-1 min-h-0"
            style={{ flexBasis: `${100 - topHeight}%`, minHeight: MIN_BOTTOM_HEIGHT }}
          >
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
          className="absolute inset-y-4"
          style={{ left: `calc(${leftWidth}% - 6px)` }}
        >
          <div
            className="w-2 h-full cursor-col-resize bg-[var(--border)] hover:bg-[color-mix(in_srgb,var(--border),#000_10%)] transition"
            onMouseDown={() => startDrag("vertical")}
          />
        </div>
      </div>

      <div
        className={`absolute left-1/2 bottom-2 z-20 w-[calc(100%-2rem)] -translate-x-1/2 rounded border border-app bg-app-dark shadow-md transition-[height] ${
          outputOpen ? "overflow-hidden" : "overflow-visible"
        }`}
        style={{ height: outputOpen ? bottomHeight : COLLAPSED_HEIGHT }}
      >
        <div
          className="flex items-center justify-between px-3 py-2 text-[0.65rem] font-semibold text-app-muted cursor-row-resize border-b border-app tracking-wide"
          onMouseDown={() => startDrag("output")}
        >
          <span>{outputOpen ? "Test Results" : "Tap to expand test results"}</span>
          <button
            type="button"
            className="text-[var(--primary)]"
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
