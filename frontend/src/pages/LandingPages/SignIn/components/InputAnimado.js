import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputAnimado = ({ placeholder = "Username", type = "text", value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <StyledWrapper>
      <div className="form-control">
        <input
          type={type}
          required
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!(value && !focused) && (
          <label>
            {placeholder.split("").map((char, index) => (
              <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                {char}
              </span>
            ))}
          </label>
        )}
      </div>
    </StyledWrapper>
  );
};

InputAnimado.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px auto 40px;
    width: 250px; /* Ancho del input */
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #ccc6d0 solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #555;
  }

  .form-control input:focus {
    outline: 0;
    border-bottom-color: rgba(221, 90, 27, 0.8);
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #ccc6d0;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span {
    color: rgba(221, 90, 27, 0.8);
    transform: translateY(-30px);
  }
`;

export default InputAnimado;
