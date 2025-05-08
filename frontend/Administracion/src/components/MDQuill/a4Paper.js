import React from "react";
import PropTypes from "prop-types";
import "../css/a4Paper.css";
export default function A4Paper({ children }) {
  return (
    <div className="a4-page">
      <div className="a4-content">{children}</div>
    </div>
  );
}

A4Paper.propTypes = {
  children: PropTypes.node.isRequired,
};
