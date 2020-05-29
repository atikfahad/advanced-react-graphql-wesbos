import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { Mutation } from 'react-apollo';
import { TOOGLE_CART_MUTATION } from './Cart';
const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href='/items'>
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href='/sell'>
              <a>Sell</a>
            </Link>
            <Link href='/orders'>
              <a>Orders</a>
            </Link>
            <Link href='/me'>
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOOGLE_CART_MUTATION}>
              {(toogleCart) => <button onClick={toogleCart}>My Cart</button>}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href='/signup'>
            <a>Sign in</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
