import React, { Component } from "react";

import { Container, Row, Col }  from 'react-bootstrap';

import ProductCard from "../Components/ProductCard";
import BasketIcon from "../Components/BasketIcon";
import BasketModal from "../Components/BasketModal";

import firebase from "../firebase";


function findIndex(id, array) {
  var found = -1;
  array.forEach((item, index) => {
    if(item.id == id) found = index;
  });
  return found;
}


export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // List of products at Firebase database
      basket: [],  // List of products in basket
      basketModalShow: false, // Modal
    };
  }

  // Retrieves products from database
  componentDidMount() {
    var productsRef = firebase.database().ref('products');
    productsRef.on('value', snapshot => {
      var productList = [];
      snapshot.forEach(product => {
        var data = product.toJSON();
        productList.push({ 
          id: product.key, 
          name: data['name'], 
          price: data['price'],
          count: 0  // How many same products do you want to buy?
        });
      });
      this.setState({ products: productList });
    });
  }

  findInBasket = (id) => {
    return this.state.basket.find(item => item.id == id);
  }

  add = (product) => {
    var copy = this.state.basket.slice(); // Copy
    if(this.findInBasket(product.id)) {
      // Update existing product in basket, increment counter
      product.count++;
      var index = findIndex(product.id, copy);
      if(index => 0) copy[index] = product;
      this.setState({ basket: copy });
    }
    else {
      // Update state with new product
      product.count = 1;
      this.setState({ basket: [...this.state.basket, product] });
    }
  }

  remove = (id) => {
    var found = -1;
    var copy = this.state.basket.slice(); // Copy
    copy.forEach((item, index) => {
      if(item.id == id) found = index;
    });
    if(found >= 0) {      
      copy.splice(found, 1); // Remove product in basket
        // Reset product counter
        var products = this.state.products.slice(); // Copy
        products[findIndex(id, products)].count = 0;
      this.setState({ basket: copy, products: products });
    }
  }

  handleQuantityChange = (id, value) => {
    var copy = this.state.products;
    var index = copy.findIndex(item => item.id == id);
    if(index >= 0) {
      copy[index].count += value;
      this.setState({ products: copy });
    }
  }

  render() {
    let basketModalClose = () => this.setState({ basketModalShow: false });
    let toggleModal = () => this.setState({ basketModalShow: !this.basketModalShow });

    return(
      <Container style={{ maxWidth: "800px", padding: "50px", paddingBottom: "50px" }}>
        <BasketIcon
          count={this.state.basket.length} 
          showModal={toggleModal}
        />
        <Row>
          {this.state.products.map((product, index) => 
            <Col key={index} md={4} xs={6}>
              <ProductCard
                key={product.key}
                data={product}
                showModal={toggleModal}
                onBuyClick={(item) => this.add(item) }
                onBasketClick={(id) => {
                  if(this.findInBasket(id)) this.remove(id);
                  else this.add(product);
                }}
              />
            </Col>
          )}
        </Row>
        <BasketModal 
          show={this.state.basketModalShow}
          onHide={basketModalClose}
          onRemove={this.remove}
          onQuantityChange={this.handleQuantityChange}
          products={this.state.basket}
          history={this.props.history}
        />
      </Container>
    );
  }
}