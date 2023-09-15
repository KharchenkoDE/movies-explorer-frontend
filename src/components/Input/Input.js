import React from 'react';
import './Input.css';

function Input({
    nameText = '',
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    errorText
}) {

    const handleChange = (event) => {
        onChange(event);
    }

  return (
    <label className='input'>
        <span className='input__name'>{nameText}</span>
        <input
            className='input__field'
            name={name} 
            type={type}
            value={value}
            onChange={evt => handleChange(evt)}
            placeholder={placeholder}
            minLength='6'
            maxLength='40'
            autoComplete="off"
            required 
        />
        {errorText && 
            <span className="input__error">{errorText}</span>
        }
        
    </label>
  );
}

export default Input;