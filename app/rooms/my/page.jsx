import getMyRooms from "@/app/actions/getMyRooms";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";

const MyRoomsPage = async () => {
    const rooms = await getMyRooms();

    return (
        <>
            <Heading title="My Rooms"/>
            {rooms.length > 0 ? 
            ( rooms.map((room) => <MyRoomCard room={room} key={room.$id}/>)) : 
            ( <p>You have no room listings.</p>) }
        </>
    );
}

export default MyRoomsPage;
