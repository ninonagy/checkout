import React, { Component } from "react";

import { Modal, Button }  from 'react-bootstrap';

import ProductList from "./ProductList";
import CodeList from "./CodeList";
import DiscountList from "./DiscountList";
import CodeInput from "./CodeInput";

function calculateDiscounts(products, discounts, usedDiscounts) {
  var availableDiscounts = [];
  var price = 0;

  products.forEach(product => {
    var productOnDiscount = discounts.find(discount => {
      return (discount.productId == product.id && 
              product.count >= discount.quantity);
    });
    var activeDiscount = usedDiscounts.find(item => item.productId == product.id);
    
    if(productOnDiscount) {
      if(!activeDiscount) {
        availableDiscounts.push(productOnDiscount);
      }
    }

    if(activeDiscount && productOnDiscount) {
      price += activeDiscount.price + 
        (product.count - activeDiscount.quantity) * product.price;
    } else {
      price += product.count * product.price;
    }

  });

  return { availableDiscounts, price };
}



export default class BasketModal extends Component {
  constructor(props) {
    super(props);
    this.state = { usedCodes: [], usedDiscounts: [] };
  }

  addCode = (newCode) => {
    this.setState({ usedCodes: [...this.state.usedCodes, newCode] });
  }

  addDiscount = (id) => {
    this.setState({ usedDiscounts: [...this.state.usedDiscounts, 
      this.props.discounts.find(item => item.productId == id)] });
  }

  removeCode = (id) => {
    var copy = this.state.usedCodes.slice();
    var index = copy.findIndex(item => item.id == id);
    if(index >= 0) {
      copy.splice(index, 1); // Remove promo code from array
      this.setState({ usedCodes: copy });
    }
  }

  removeDiscount = (id) => {
    var copy = this.state.usedDiscounts.slice();
    var index = copy.findIndex(item => item.productId == id);
    if(index >= 0) {
      copy.splice(index, 1);
      this.setState({ usedDiscounts: copy });
    }
  }

  render() {
    var { products, codes, discounts } = this.props;
    var totalPrice = 0;

    // Apply discounts and calculate new price
    var { availableDiscounts, price } = 
      calculateDiscounts(products, discounts, this.state.usedDiscounts);
    
    totalPrice += price;

    // Apply codes and calculate new price
    this.state.usedCodes.forEach(item => {
      if(item.isPercentage) totalPrice *= (100 - item.value) / 100;
      else totalPrice -= item.value;
    })

    return(
      <Modal   
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Basket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.length ?
            <section>
              <p>Here are your products in a basket: </p>
              <ProductList 
                products={products}
                discounts={availableDiscounts} 
                useDiscount={this.addDiscount}
                changeQuantity={this.props.onQuantityChange}
                remove={(id) => {
                  this.props.onRemove(id);
                  this.removeDiscount(id);
                }} />
              <div style={{ float: "right", marginTop: "20px" }}>
                <CodeInput 
                  codes={codes}
                  usedCodes={this.state.usedCodes}
                  add={this.addCode}
                />
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <CodeList 
                    codes={this.state.usedCodes} 
                    remove={this.removeCode}
                  />
                  <DiscountList 
                    discounts={this.state.usedDiscounts}
                    remove={this.removeDiscount}
                  />
                  <h3>
                    Total price: {totalPrice.toFixed(2)}€
                  </h3>
                </div>
              </div>
            </section>
          : <p>You don't have any products in the basket yet.</p>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            variant="primary" 
            disabled={products.length ? false : true }
            onClick={() => this.props.history.push({
              pathname: '/order',
              state: {
                data:{
                  products: this.props.products,
                  codes: this.state.usedCodes,
                  discounts: this.state.usedDiscounts,
                  totalPrice: totalPrice,
                }
              }
            })}>
            Check out
          </Button>
        </Modal.Footer>
      </Modal>
    );  
  }
}  
