import React from 'react';


const ChatTemplate = ({chat_room_list, chat_room}) => {
    return (
        <main className='chat-template'>
            <div className= 'title'>
                Chat Service
            </div>
        <section className="chat-ro-list-wrapper">
            {chat_room_list}
        </section>
        <section className={"chat-room-wrapper"}>
            { chat_room }
        </section>
        </main>
    )
};

export default ChatTemplate;


