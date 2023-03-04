import { Link } from 'react-router-dom';

export default function AuthorsProfile({cat}) {
  return (
    <Link to={`/profile/${cat?.id}`} >
      <td className='d-flex justify-content-start user '>
        <img
          src={cat?.profilePhoto}
          alt=''
          className='img-fluid avatar rounded'
        />
        <span className='info'>
          <p className='text-capitalize'>{cat?.firstName}</p>
          <p> {cat?.email}</p>
        </span>
      </td>
    </Link>
  );
}
