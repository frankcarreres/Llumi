import React from "react";
import styled from "styled-components";

const TextFieldChat = (placeholder, value, onChange, onKeyDown, disabled) => {
  return (
    <StyledWrapper>
      <input
        type="text"
        autoComplete="off"
        name="text"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
    transition: 300ms ease-in-out;
    width: 100%;
  }

  .input:focus {
    background-color: white;
    transform: scale(1.05);
  }
`;

export default TextFieldChat;
