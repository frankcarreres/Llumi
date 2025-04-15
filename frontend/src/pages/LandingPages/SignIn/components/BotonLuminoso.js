import React from "react";
import styled from "styled-components";

const BotonLuminoso = () => {
  return (
    <StyledWrapper>
      <button id="bottone1">
        <strong>ACCEDIR</strong>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center; /* Centra el botón */

  #bottone1 {
    padding-left: 70px; /* Aumentamos el padding horizontal */
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
    color: #ffffff; /* Texto en blanco */
  }

  #bottone1:hover {
    box-shadow: 7px 5px 56px -14px #ea8100;
  }

  #bottone1:active {
    transform: scale(0.97);
    box-shadow: 7px 5px 56px -10px #ea8100;
  }
`;

export default BotonLuminoso;
