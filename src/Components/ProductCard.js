import React, { Component } from "react";

import { Card, Button }  from 'react-bootstrap';

// function ProductCard({ name, price, history }) {
export default function ProductCard({ data, showModal, onBasketClick, onBuyClick }) {
  const { name, price } = data;

  var variant = data.count == 0 ? 'outline-primary' : 'primary';  

  return(
    <Card style={{ margin: "15px" }}>
      <Card.Img variant="top" src="https://via.placeholder.com/200x220" />
      <Card.Body>
        <Card.Title align="center">{name} {price}€</Card.Title>
        <Button style={{ float: "left", width: "30%" }} 
                variant={variant}
                size="sm"
                onClick={() => onBasketClick(data.id) }>
          <i className="fas fa-shopping-cart" 
             style={{ fontSize: "22px" }}
             title="Add to basket">
          </i>
        </Button>
        <Button style={{ float: "right", width: "60%" }}
                variant="primary"
                size="sm"
                onClick={() => { onBuyClick(data); showModal(); }}
                >Buy</Button>
      </Card.Body>
    </Card>
  ); 
}