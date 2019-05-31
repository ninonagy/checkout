import React, { Component } from "react";

import { Container, Form, Button }  from 'react-bootstrap';

import PaymentForm from "../Components/Payment/PaymentForm";

var container = {
  maxWidth: "550px",
  marginTop: "50px",
  marginBottom: "50px",
  padding: "20px",
  border: "1px solid lightgray",
  borderRadius: "10px",
};

export default class OrderPage extends Component {
  render() {
    var { products, codes, discounts, totalPrice } = this.props.history.location.state.data;

    var discountsFormatted = [];
    products.forEach(product => {
      var discount = discounts.find(item => item.productId == product.id); 
      if(discount) {
        // 
        var price = (product.price * discount.quantity - discount.price)
        discountsFormatted.push('- ' + price.toFixed(2) + '€');
      }
    })
    
    return(
      <Container style={container}>
        <h2>Checkout</h2>
        <p>Please review your order below: </p>
        <hr/>
        {products.map(product => 
          <div key={product.id}>
            <p style={{ display: "inline-block", marginRight: "20px" }}>
              {product.name + ' x ' + product.count}
            </p>
            <span style={{ float: "right", fontWeight: "bold" }}>
              {(product.price * product.count).toFixed(2) + '€'}
            </span>
          </div>
        )}
        <hr/>
        <div style={{ textAlign: "right" }}>
          {(codes.length > 0 || discounts.length > 0) &&
            <div>
              <div>Promo codes: </div>
              {discountsFormatted.map(item => 
                <div>
                  <b>{item}</b>
                </div>
              )}
              {codes.map(item => 
                <div>
                  <b>{'- ' + item.value + (item.isPercentage ? '%' : '€')}</b>
                </div>
              )}
              <hr/>
            </div>
          }
          <div>
            Total price: <b>{totalPrice.toFixed(2)}€</b>
          </div>
        </div>        
      
        <div style={{ margin: "40px 0" }}>
          <p>Payment information: </p>
          <PaymentForm handleBackClick={() => this.props.history.push('/') }/>
        </div>
      </Container>
    );
  }
}