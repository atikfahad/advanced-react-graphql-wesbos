import UpdateItem from '../components/UpdateItem';
import Link from 'next/link';
const Update = ({ query }) => {
  return <UpdateItem id={query.id} />;
};

export default Update;
