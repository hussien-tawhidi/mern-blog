import { useDispatch } from 'react-redux';

export default function AuthosStatus({ cat, userAuth, blockUser, unBlockUser }) {
  const dispatch = useDispatch();
    
  return (
    <div className='status d-flex justify-content-center align-items-center w-100 h-100 text-center'>
      {!cat?.isBlocked ? (
        <button
          disabled={!userAuth?.isAdmin}
          className='btn btn-outline-danger d-flex justify-content-center align-items-center mx-auto'
          onClick={() => dispatch(blockUser(cat?.id))}>
          <span className='p-2 bg-danger border border-light rounded-circle'>
            <span className='visually-hidden'>New alerts</span>
          </span>
          Block
        </button>
      ) : (
        <button
          className='btn btn-outline-secondary'
          onClick={() => dispatch(unBlockUser(cat?.id))}
          disabled={!userAuth?.isAdmin}>
          <div className='d-flex justify-content-center align-items-center mx-auto'>
            <span className='p-2 bg-secondary border border-light rounded-circle'>
              <span className='visually-hidden'>New alerts</span>
            </span>
            UnBlock
          </div>
        </button>
      )}
    </div>
  );
}
