import { useCallback, useEffect, useState } from 'react';

interface UseCounterOptions {
  interval: number;
  max?: number;
}

/** 일정 간격으로 증가하는 Counter */
export const useCounter = ({ interval, max }: UseCounterOptions) => {
  const [count, setCount] = useState<number>(0);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (max !== undefined && prev >= max ? 0 : prev + 1));
    }, interval);

    return () => clearTimeout(timer);
  }, [interval, max]);

  return { count, reset };
};
