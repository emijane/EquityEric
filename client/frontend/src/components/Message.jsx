import React, {useState} from 'react'

const Message = ({ messages, completeMessage }) => {
    const [edit, setEdit] = useState({
      id: null,
      value: ''
    });

return messages.map((message, index) => (
    <div 
    className={message.isComplete ? 'message-row complete' : 'message-row'} 
    key={index}
    >
      <div key={message.id} onClick={() => completeMessage(message.id)}>
        {message.text}
      </div>
    </div>
  ));
}

export default Message;

