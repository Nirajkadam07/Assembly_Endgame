import React from "react";
import { useTimer } from "react-timer-hook";

export default function GameTimer({
  expiryTimestamp,
  isStart,
  isPaused,
  onExpire,
}) {
  const { minutes, seconds, pause } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: true,
  });

  React.useEffect(() => {
    if (isPaused) {
      pause();
    }
  }, [isPaused, pause]);

  return (
    <span className="timer">{`Remaining time: ${minutes}:${seconds}`}</span>
  );
}
