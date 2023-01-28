import React, { Component, useState } from "react";
import "../Chat.css";
import ChatBox from '../components/ChatBox';
const ChatPage = () => {

  return (
    <div className="page-wrapper flex">
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
        <div className="section-container flex w-[82%] place-items-center flex-col h-[100vh]">
            <div className="header flex">
                <h1 className="text-4xl primary-blue font-bold pt-8">Chat with Eric</h1>
            </div>
            <div className="chat-box w-[70%] mt-20 flex flex-col justify-between h-[100vh]">
                <div className="messages w-full flex flex-col">
                    <div className="message-row w-full flex justify-end">
                        <div className="text-white message-user flex bg-[#3894FF] p-4 w-[35%] rounded-br-2xl rounded-bl-2xl rounded-tl-2xl drop-shadow-sm">
                            <p>How can I find affordable healthcare coverage?</p>
                        </div>
                    </div>
                    <div className="message-row w-full flex justify-start">
                        <div className="message-bot p-4 bg-[#F5F8FF] w-[35%] rounded-br-2xl rounded-bl-2xl rounded-tr-2xl border border-[#3895ff1d] drop-shadow-sm">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        </div>
                    </div>
                    <ChatBox />
                </div>
            </div>
        </div>
    </div>
  )
    
};

export default ChatPage;
