import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOOGLE_CART_MUTATION = gql`
  mutation {
    toogleCart @client
  }
`;

const Cart = () => {
  return (
    <Mutation mutation={TOOGLE_CART_MUTATION}>
      {(toogleCart) => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <CloseButton onClick={toogleCart} title='close'>
                  &times;
                </CloseButton>
                <Supreme>Your Cart</Supreme>
                <p>You have __ Items in your cart.</p>
              </header>

              <footer>
                <p>10.10</p>
                <SickButton>Checkout</SickButton>
              </footer>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Cart;

export { LOCAL_STATE_QUERY, TOOGLE_CART_MUTATION };
