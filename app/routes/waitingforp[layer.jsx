// app/routes/waitingforplayer.jsx
import { useSearchParams } from '@remix-run/react';

export default function WaitingForPlayer() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  return (
    <div>
      <h1>Waiting for Player</h1>
      <p>Room ID: {roomId}</p>
      {/* Additional UI components can go here */}
    </div>
  );
}
