import React from 'react';

import firebase from '../../firebase';
import Modal from './Modal';

export default class BasketInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { codes: [], discounts: [] };
  }

  // Retrieves promotions from database
  componentDidMount() {
    var codesRef = firebase.database().ref('promotions/codes');
    var discountsRef = firebase.database().ref('promotions/discounts');

    codesRef.once('value').then(snapshot => {
      var codes = [];
      snapshot.forEach(data => {
        var code = data.val();
        code.id = data.key;
        codes.push(code);
      })
      this.setState({ codes: codes });
    });

    discountsRef.once('value').then(snapshot => {
      var discounts = [];
      snapshot.forEach(data => {
        var discount = data.val();
        discounts.push(discount);
      })
      this.setState({ discounts: discounts });
    });
  }

  render() {
    return(
      <Modal 
        {...this.props}
        codes={this.state.codes}
        discounts={this.state.discounts}
      />
    );
  }
}