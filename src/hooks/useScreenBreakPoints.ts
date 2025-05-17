import { useState, useEffect } from "react";

const ranges = [
  { min: 0, max: 799, value: 1 },
  { min: 800, max: 1099, value: 2 },
  { min: 1100, max: Infinity, value: 3 },
];

export function useScreenBreakPoints() {
  const [value, setValue] = useState<number>(3);

  useEffect(() => {
    function handleResize() {
      setValue(getValue(window.innerWidth));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return value;
}

function getValue(width: number) {
  const range = ranges.find((r) => width >= r.min && width <= r.max);
  return range?.value ?? 3;
}
