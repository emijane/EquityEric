import React, { useRef } from 'react'
import { useEffect } from 'react';

const PasswordStrengthLabel = ({password}) => {

    // Special thanks to Terrence Aluda for the tutorial! slightly modified to conditionally render components instead of swap styles 
    // the way it works is by checking checking the complexity of the password against Regex
    // Actually scrap that I think I might just use useEffect with pwd as a dependency
    const strengthRef = useRef();
    const checkStrength = (pwd) => {
        let password = pwd;
        let strength = 0;
        if (password.match(`/[a-z]+/`)) {
            strength += 1;
            console.log(strength);
        }
        if (password.match(`/[A-Z]+/`)) {
          strength += 1;
        }
        if (password.match(`/[0-9]+/`)) {
          strength += 1;
        }
        if (password.match(`/[$@#&!]+/`)) {
          strength += 1;
        }
        return strength;
    }
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    useEffect(() => {
        
        if (strongPassword.test(password) && password.length > 0 && strengthRef.current) {
            strengthRef.current.style.color = 'green';
            strengthRef.current.textContent  = 'Strong!';
        } else if (password.length > 10 && strengthRef.current) {
            strengthRef.current.style.color = 'blue';
            strengthRef.current.textContent  = 'Good';
        } else if (strengthRef.current) {
            strengthRef.current.style.color = 'red';
            strengthRef.current.textContent  = 'Weak';
        }
    }, [password])
  return (
    <span ref={strengthRef} className="text-sm">

    </span>
  )
}

export default PasswordStrengthLabel