import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BotoDenuncia = ({ children, onClick, type = "button", color = "#c20000", ...rest }) => {
  return (
    <StyledWrapper color={color}>
      <button onClick={onClick} type={type} {...rest}>
        {children}
      </button>
    </StyledWrapper>
  );
};

BotoDenuncia.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  color: PropTypes.string,
};

const StyledWrapper = styled.div`
  button {
    --bg: ${({ color }) => color};
    --shadow: ${({ color }) => `${color}90`}; /* Color con transparencia */
    --text-color: #fff;

    position: relative;
    width: 150px;
    border: none;
    background: var(--bg);
    color: var(--text-color);
    padding: 1em;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.2s;
    border-radius: 5px;
    opacity: 0.85;
    letter-spacing: 1px;
    box-shadow: var(--shadow) 0px 7px 2px, #000 0px 8px 5px;
  }

  button:hover {
    opacity: 1;
  }

  button:active {
    top: 4px;
    box-shadow: var(--shadow) 0px 7px 2px, #000 0px 8px 5px;
  }
`;

export default BotoDenuncia;
