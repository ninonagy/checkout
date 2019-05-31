import React from 'react';
import { Button } from 'react-bootstrap';

export default function DiscountList({ discounts, remove }) {
  return(
    discounts.map((item, index) => 
      <div key={index} style={{ margin: "10px 0" }}>
        <span>{'Discount: ' + item.price.toFixed(2) + '€'} for {item.quantity}</span>
        <Button
          variant="link"
          size="sm"
          title="Remove discount" 
          onClick={() => remove(item.productId)}>
          X
        </Button>
      </div>
    )
  );
}