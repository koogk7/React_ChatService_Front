import React from 'react';


const ChatTemplate = ({chat_list, children}) => {
    return (
        <main className='chat-template'>
            <div className= 'title'>
                Chat Service
            </div>
        <section className="chat-list-wrapper">
            {chat_list}
        </section>
        <section className={"chat-wrapper"}>
            { children}
        </section>
        </main>
    )
};

export default ChatTemplate;


