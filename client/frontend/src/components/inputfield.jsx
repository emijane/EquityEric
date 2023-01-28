import React, { Component, useState } from 'react';
import { render } from 'react-dom';

export default function InputField({name,label}) {
  const [state, setState] = useState('')
  return (
    <div>
     <label>{label}</label>
      <input type="text" 
      value={state} 
      name={name}
      onChange={(e) => setState(e.target.value)} />
    </div>
  );

}
