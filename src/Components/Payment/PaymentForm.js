import React from "react";

import { Form, Col, Button } from "react-bootstrap";

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Address</Form.Label>
            <Form.Control required type="text" />
            <Form.Control.Feedback type="invalid">
              Please enter you address.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Credit Card type</Form.Label>
            <Form.Control as="select" required>
              <option />
              <option>Visa</option>
              <option>Master Card</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose card type.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control required type="number" />
            <Form.Control.Feedback type="invalid">
              Please provide a card number.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control required type="date" />
            <Form.Control.Feedback type="invalid">
              Please provide an expiration date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Card Verification Number</Form.Label>
            <Form.Control required type="number" />
            <Form.Control.Feedback type="invalid">
              Please provide a verification number.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Button variant="light" style={{ float: "left" }}
          onClick={this.props.handleBackClick}>
          Back
        </Button>

        <Button type="submit" variant="warning" style={{ float: "right" }}>
          PLACE ORDER
        </Button>
      </Form>
    );
  }
}