import React, { useState } from "react";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "../Chat.css";
import useAuth from "../hooks/useAuth";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const { auth } = useAuth();
  /**
   * @function handleGetResponse sends payload to the Django backend for a response from the bot. The query is in format
   * @param {string} utterance //message
   * @param {int} conversationId id of conversation
   * @note no Auth needed rn
   */
  const handleGetResponse = async (message, newMessages) => {
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

  };
  const addMessage = (message) => {
    if (!message.text || /^\s*$/.test(message.text)) {
      return;
    }
    const newMessages = [...messages, message];
    
    setMessages(newMessages);
    console.log(message.text);
    handleGetResponse(message, newMessages);
  };

  return (
    <div className="h-full flex flex-col">
      <Message messages={messages} />

      <div>
        <MessageForm onSubmit={addMessage} />
      </div>
    </div>
  );
}

export default MessageList;
