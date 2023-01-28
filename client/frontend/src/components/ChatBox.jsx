import React, { Component, useRef } from "react";
import "../Chat.css";
import InputField from './inputfield';

const ChatBox = () => {
    const nameForm = useRef(null);

    const handleClickEvent = () => {
       const form = nameForm.current
       console.log(`${form['firstname'].value}`)
    }
  
    return (
      <div>
        <form ref={nameForm}>
         <InputField className="w-[100%] border-1" name={'firstname'}/>
        </form>
        <button onClick={handleClickEvent}>Send</button>
      </div>
    );
};

export default ChatBox;