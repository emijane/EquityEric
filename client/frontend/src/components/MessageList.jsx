import React, {useState} from 'react'
import MessageForm from './MessageForm'
import Message from './Message';
import "../Chat.css";

function MessageList() {

    const [messages, setMessages] = useState([]);

    const addMessage = message => {
        if(!message.text || /^\s*$/.test(message.text)) {
            return
        }

        const newMessages = [message, ...messages]

        setMessages(newMessages);
    }

    return (
        <div className="h-full flex flex-col place-content-between">
                <div className="message-container flex justify-end mb-10">
                    <div className="message flex gap-5 max-w-sm flex-col-reverse w-[100%]">
                        <Message
                        messages={messages}
                        />
                    </div>
                </div>
            <div>
                <MessageForm onSubmit={addMessage} />
            </div>
        </div>
    )
}

export default MessageList
