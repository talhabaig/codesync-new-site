"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV } from "react-icons/fa";

interface ActionMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  children: ReactNode;
  widthClass?: string;
}

export function ActionMenu({
  open,
  onOpenChange,
  label,
  children,
  widthClass = "w-48",
}: ActionMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const menuWidth = panel?.offsetWidth || 192;
    const menuHeight = panel?.offsetHeight || 0;
    const gap = 6;
    const padding = 8;

    let left = rect.right - menuWidth;
    left = Math.min(left, window.innerWidth - menuWidth - padding);
    left = Math.max(padding, left);

    let top = rect.bottom + gap;
    if (menuHeight && top + menuHeight > window.innerHeight - padding) {
      top = Math.max(padding, rect.top - menuHeight - gap);
    }

    setCoords((prev) =>
      prev && prev.top === top && prev.left === left ? prev : { top, left }
    );
  };

  const setPanelNode = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (node) updatePosition();
  };

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onReposition = () => updatePosition();
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      onOpenChange(false);
    };

    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, onOpenChange]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        type="button"
        onClick={() => onOpenChange(!open)}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
        <FaEllipsisV />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={setPanelNode}
            role="menu"
            style={{
              position: "fixed",
              top: coords?.top ?? -9999,
              left: coords?.left ?? -9999,
              visibility: coords ? "visible" : "hidden",
            }}
            className={`${widthClass} z-[200] rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg`}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}
