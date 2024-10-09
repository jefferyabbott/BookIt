import rooms from '@/data/rooms.json';
import RoomCard from '@/components/RoomCard';

export default function Home() {
  return (
    <>
      { rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room}/>)
      ) : (
        <p>No rooms available at the moment</p>
      ) }
    </>
  );
}
