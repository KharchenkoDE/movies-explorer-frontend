import React from 'react';
import './Input.css';

function Input({
    nameText = '',
    name,
    type = 'text',
    value,
    onChange,
    onFocus,
    placeholder,
    errorText
}) {

    const handleChange = (event) => {
        onChange(event);
    }

    const handleFocus = () => {
        onFocus();
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
            onFocus={() => handleFocus()}
            placeholder={placeholder}
            autoComplete="off" 
        />
        {errorText && 
            <span className="input__error">{errorText}</span>
        }
        
    </label>
  );
}

export default Input;