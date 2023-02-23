import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector(
    (store) => store.users
  );

  return (
    <div>profile</div>
  )
}
