import React from "react";
import Button from "@mui/material/Button";

function WizardDenuncia() {
  const handleClick = () => {
    alert("Hola");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Pulsar
      </Button>
    </div>
  );
}

export default WizardDenuncia;
