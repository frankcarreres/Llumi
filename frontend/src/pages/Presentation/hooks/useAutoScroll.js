import { useEffect, useRef } from "react";

export default function useAutoScroll(dependencia) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dependencia]);

  return bottomRef;
}
