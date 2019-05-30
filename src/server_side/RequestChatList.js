import axios from 'axios';


async function requestChatList() {
    console.log("getChatList");

    const response = await axios.get('http://localhost:8080', {
        header: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);
}

export default requestChatList;