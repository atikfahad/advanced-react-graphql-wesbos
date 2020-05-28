import Reset from '../components/Reset';
import Link from 'next/link';
const Sell = (props) => {
  return <Reset resetToken={props.query.resetToken} />;
};

export default Sell;
