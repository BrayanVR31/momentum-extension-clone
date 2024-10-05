import { useEffect, RefObject, useState } from "react";

function useOutsideClick<T>(elementRef: RefObject<T>) {
  // State
  const [isOutClick, setIsOutClick] = useState(false);
  // Effects
  useEffect(() => {
    // Event handler to global event
    const handleClick = (event: MouseEvent) => {
      if (elementRef.current) {
        const currentNode = event.target as Node;
        const nodeRef = elementRef.current as unknown;
        setIsOutClick(!currentNode.isSameNode(nodeRef as Node));
      }
    };
    // Register a new global click listener - register
    window.addEventListener("click", handleClick);
    // Remove existing click listener - cleanup
    return () => window.removeEventListener("click", handleClick);
  }, [elementRef]);
  return { isOutClick };
}

export { useOutsideClick };
