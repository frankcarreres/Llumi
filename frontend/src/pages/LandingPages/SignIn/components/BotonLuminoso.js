import React from "react";
import styled from "styled-components";

const BotonLuminoso = () => {
  return (
    <StyledWrapper>
      <button id="botonInicio">
        <strong>ACCEDIR</strong>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center;

  #botonInicio {
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 9px;
    background: #dd5a1bcc;
    border: none;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    transition: 0.4s;
    color: #ffffff;
  }

  #botonInicio:hover {
    box-shadow: 7px 5px 56px -14px #ea8100;
  }

  #botonInicio:active {
    transform: scale(0.97);
    box-shadow: 7px 5px 56px -10px #ea8100;
  }
`;

export default BotonLuminoso;
