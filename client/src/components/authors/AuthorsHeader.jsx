
export default function AuthorsHeader() {
  return (
    <div className='row'>
      <div className='col-4'>
        <th scope='col'>
          <p className='table-title'>USERS</p>
        </th>
      </div>
      <div className='col-2'>
        <th scope='col'>
          <p className='table-title'>ACCOUNT TYPE</p>
        </th>
      </div>
      <div className='col-2'>
        <th scope='col'>
          <p className='table-title'>JOINED</p>
        </th>
      </div>
      <div className='col-2'>
        <th scope='col'>
          <p className='table-title'>FOLLOWERS</p>
        </th>
      </div>
      <div className='col-2'>
        <th scope='col'>
          <p className='table-title'>Status</p>
        </th>
      </div>
    </div>
  );
}
