import React, { useState } from "react";
const Message = ({ messages, completeMessage }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  return messages.map((message, index) => (
    <div
      className={`message-container flex ${
        message.isBot ? "flex-row-reverse justify-end" : "flex-row justify-end"
      } mb-1 sm:mb-10`}
    >
      <div className="message flex gap-5 max-w-sm flex-col-reverse w-[100%]"></div>
      <div
        className={message.isBot ? "message-row p-2 sm:p-4 is-bot text-sm sm:text-md" : "message-row p-2 sm:p-4"}
        key={index}
      >
        <div key={message.id} onClick={() => completeMessage(message.id)}>
        </div>
      </div>
    </div>
  ));
};

export default Message;
