import React, { Component, useState } from "react";
import "../Chat.css";
import MessageList from "../components/MessageList";

const ChatPage = () => {

  return (
    <div className="page-wrapper flex flex-col">
        <div className="section-container flex w-[100%] justify-center place-items-center flex-col h-[100vh]">
        <nav className="flex justify-center">
            <ul className="flex gap-10 place-content-between text-sm opacity-70 p-4 w-[20rem]">
                <li><a href="../">Home</a></li>
                <li><a href="../Chat">Chat</a></li>
                <li><a href="../About">About</a></li>
            </ul>
        </nav>
            <div className="section-container-inner w-[95%] sm:w-[80%] flex place-items-center flex-col">
                <div className="header flex flex-col text-center">
                    <h1 className="text-4xl primary-blue font-bold pt-8 mb-4">Chat with Eric</h1>
                    <p className="opacity-80">Ask Eric healthcare related questions to receive transparent answers.</p>
                </div>
                <div className="chat-box w-[100%] sm:w-[70%] mt-20 flex flex-col justify-between h-[70vh]">
                    <MessageList />
                </div>
            </div>
        </div>
    </div>
  )
    
};

export default ChatPage;
