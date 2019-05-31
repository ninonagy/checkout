import React from 'react';

import { Button } from 'react-bootstrap';

export default class CodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { promoValue: '', message: '' };
  }

  handleChange = (e) => {
    this.setState({ promoValue: e.target.value });
    // this.setState({ message: '' })
  }

  processCode = () => {
    var code = this.state.promoValue;
    var newCode = this.props.codes.find(item => item.id == code);
    
    var message = '';
    var usedCodes = this.props.usedCodes;

    var nonCombineableInside = usedCodes.find(item => item.combineable == false);

    if(newCode) {
      if(nonCombineableInside) {
        message = 'Cannot use that promo code with existing one.';
      }
      else if(!newCode.combineable && usedCodes.length > 0)
      {
        message = 'This promo code cannot be used with other codes.';
      } else {
        if(usedCodes.find(item => item.id == code)) {
          message = 'Promo code is already activated.';
        } else {
          this.props.add(newCode);
          message = 'Succesfully added promo code.';
        }
      }
    } else {
      message = 'Invalid promo code.';
    }

    this.setState({ promoValue: '', message: message });
  }

  render() {
    return( 
      <div>
        <label style={{ marginRight: "5px" }}>Enter Promotional Code</label>
        <input 
          type="text"
          value={this.state.promoValue} 
          onChange={this.handleChange}
        />
        <Button variant="link" size="sm"
          onClick={this.processCode}
        >APPLY CODE</Button>
        <div style={{ fontSize: "12px" }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}