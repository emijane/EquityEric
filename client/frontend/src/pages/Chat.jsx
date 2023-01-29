import React, { Component, useState } from "react";
import "../Chat.css";
import MessageList from "../components/MessageList";

const ChatPage = () => {

  return (
    <div className="page-wrapper flex">
        {/* A JSX comment
        <div className="sidebar-container flex flex-col w-[18%] h-[100vh]">
            <div className="favicon-component flex place-content-center pt-8 pb-20 gap-2">
                <i className="primary-blue fa-solid fa-notes-medical text-3xl"></i>
                <p className="primary-blue text-3xl font-bold">Ask Eric</p>
            </div>
            <div className="menu-wrapper">
                <div className="p-4 transition">Menu Item</div>
                <div className="p-4 transition">Menu Item</div>
                <div className="p-4 transition">Menu Item</div>
                <div className="p-4 transition">Menu Item</div>
            </div>
        </div>
        */}
        <div className="section-container flex w-[100%] justify-center place-items-center flex-col h-[100vh]">
            <div className="section-container-inner w-[95%] sm:w-[80%] flex place-items-center flex-col">
                <div className="header flex">
                    <h1 className="text-4xl primary-blue font-bold pt-8">Chat with Eric</h1>
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
