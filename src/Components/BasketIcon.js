import React, { Component } from "react";

var container = {
  position: "fixed",
  right: "10%",
  zIndex: 10,
  cursor: "pointer"
};

var icon = {
  fontSize: "64px",
  color: "gray"
};

var counter = {
  position: "absolute",
  bottom: "0",
  left: "0",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  fontSize: "18px",
  lineHeight: "24px",
  textAlign: "center",
}

export default function BasketIcon({ count, showModal }) {
  if(count == 0) {
    return null;
  } else {
    return(
      <div style={container}
        onClick={showModal}>
        {/* TODO: Add icon */}
        <i className="fas fa-shopping-basket" style={icon}></i>
        {count > 0 && <span style={counter}>{count}</span>}
      </div>
    );
  }
}

