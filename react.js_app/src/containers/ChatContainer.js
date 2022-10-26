import { useState, useEffect, useContext } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";
import Search from "../components/Search";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
// import { useUser } from "./AppContainer";

const ChatContainer = ({users, socket}) => {

    const [friends, setFriends] = useState([]);
    const {loggedInUser, setLoggedInUser, chats} = useContext(UserContext);

    const navigate = useNavigate()
    
    const [currentChat, setCurrentChat] = useState([]);

    const filteredChats = chats.filter(chat => {
        // const chats = [];
        // chat.users.forEach(user => {
        //     if (user.id === loggedInUser.id) {
        //         chats.push(chat);
        //     }
        // })
        // return chats;
        return chat.users.map(user => user._id === loggedInUser._id)
    })

    // const addFriend = async (friend) => {
    //     const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser.id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(friend)
    //     }) 
    //     const friendData = await response.json();
    //     // come back to when logged in user is set up
    //     setLoggedInUser();
    // }

    useEffect (() => {
         setFriends(loggedInUser.friends);
    }, [])
   
    const currentFriendChat = (friendChat) => {
        setCurrentChat(friendChat[0]);
    }

    const filteredFriends = searchedUser => {
        setFriends(searchedUser)
    }

    const logOut = () => {
        setLoggedInUser()
        navigate('/')
    }

    console.log(currentChat);

    return (
        <>
            <header className="chat-header">
                <p>You are logged in as {loggedInUser.username}</p>
                <button onClick={logOut}>Log Out</button>
            </header>
            <main className="chat-main">
                <section>
                <Search filteredFun={filteredFriends} />
                {/* <AddFriend users={users}/> */}
                <FriendsList friends={friends} filteredChats={filteredChats} currentFriendChat={currentFriendChat}/>
                </section>
                <section>
                    {currentChat.length !== 0 ? <Chat socket={socket} currentChat={currentChat} setCurrentChat={setCurrentChat}/> : <></>}
                </section>
            </main>         
        </>
    )
}

export default ChatContainer;
