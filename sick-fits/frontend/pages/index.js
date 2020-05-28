import Items from '../components/Items';
import Link from 'next/link';
const Home = (props) => {
  return (
    <>
      <Items page={parseFloat(props.query.page) || 1} />
    </>
  );
};

export default Home;
