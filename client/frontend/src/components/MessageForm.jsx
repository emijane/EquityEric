import React, {useState} from 'react'

function MessageForm(props) {

const [input, setInput] = useState('');

const handleChange = e => {
    setInput(e.target.value);
}

const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input
    });

    setInput('');
}

  return (
    <form className="message-form flex gap-4" onSubmit={handleSubmit} >
        <input type="text" placeholder="Add a message" value={input} name="text" className="message-input flex message-form-container w-[100%] p-2" onChange={handleChange} disabled={props.disable}></input>
        <button className='message-button' onClick={handleSubmit}><i className="fa-solid fa-comment send-icon" disabled={props.disable}></i></button>
    </form>
  );
}

export default MessageForm;
