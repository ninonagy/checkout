import React from 'react';

import { Button } from 'react-bootstrap';

const isProductOnDiscount = (product, discounts) => discounts.find(discount => {
  return (discount.productId == product.id && 
          product.count >= discount.quantity);
});

export default function ProductList({ products, discounts, useDiscount, changeQuantity, remove }) {
  return(
    products.map(product => 
      <div key={product.id}>
        <h3 style={{ display: "inline-block", marginRight: "20px" }}>
          {product.name}
        </h3>
        <span>{(product.count * product.price).toFixed(2)}€</span>
        {isProductOnDiscount(product, discounts) &&
          <Button 
            variant="link" size="sm"
            onClick={() => useDiscount(product.id)}>
            Use discount
          </Button>
        }
        <Button style={{ float: "right" }} variant="dark" size="sm"
                onClick={() => remove(product.id) }
        >Remove</Button>
        <div>
          Quantity: &nbsp;
          <input type="number" min="1" max="10" value={product.count}
            onChange={(e) => {
              if(e.target.value > 0 && e.target.value <= 10) 
                changeQuantity(product.id, e.target.value - product.count)
            }}
          ></input>
        </div>
      </div>
    )
  );
}