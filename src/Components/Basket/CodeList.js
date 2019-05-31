import React from 'react';

import { Button } from 'react-bootstrap';

export default function CodeList({ codes, remove }) {
  return(
    codes.map((item, index) => 
      <div key={index} style={{ margin: "10px 0" }}>
        <span>{item.value}{item.isPercentage ? '%' : '€'} Off</span>
        <Button
          variant="link"
          size="sm"
          title="Remove code" 
          onClick={() => remove(item.id)}>
          X
        </Button>
      </div>
    )
  );
}