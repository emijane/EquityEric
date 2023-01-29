import React, { useState } from "react";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "../Chat.css";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { auth } = useAuth();
  /**
   * @function handleGetResponse sends payload to the Django backend for a response from the bot. The query is in format
   * @param {string} utterance //message
   * @param {int} conversationId id of conversation
   * @note no Auth needed rn
   */
  const handleGetResponse = async (message, newMessages) => {
    const placeholderMessages = [...newMessages, {text: 'loader', id: 19, isBot: true}];
    setMessages(placeholderMessages);
    const token = auth?.accessToken ? auth.accessToken : "no access token";
    const body = {
      utterance: message.text,
      conversationId: 1,
      security_token: token,
    };
    // Fetch with post request
    let response = await fetch(
      `https://ae90-2601-601-1b80-33a0-99e8-519d-5797-1c39.ngrok.io/api/bottalk/`,
      {
        body: JSON.stringify(body),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // Then, take the JSON returned from the response
    const { display } = await response.json();
    // Bot Message Please
    addBotMessage({text: display, id: 20, isBot: true}, newMessages)
  };
  const addBotMessage = (message, new_messages) => {
    if (!message.text || /^\s*$/.test(message.text)) {
      return;
    }
    const newMessages = [...new_messages, message];
    setMessages(newMessages);
    setIsDisabled(false);

  };
  const addMessage = (message) => {
    setIsDisabled(true);
    if (!message.text || /^\s*$/.test(message.text)) {
      return;
    }
    const newMessages = [...messages, message];
    
    setMessages(newMessages);
    console.log(message.text);
    
    handleGetResponse(message, newMessages);
  };

  useEffect(() => {
    const el = document.getElementById('chat-messages');
    // id of the chat container ---------- ^^^
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages])

  return (
    <div className="h-[70vh] max-h-[70vh] flex flex-col justify-between">
        <div id="chat-messages" className="chat-messages">
        <Message messages={messages} />

        </div>
      <div className="h-20 justify-self-end">
        <MessageForm disable={isDisabled} onSubmit={addMessage} />
      </div>
    </div>
  );
}

export default MessageList;
