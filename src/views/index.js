import { Link } from "react-router-dom";

// This file will render at / path which will serve as a directory to all the components and views

export default () => {
  return (
    <div className='root-directory'>
      <h1>Components</h1>
      <ul>
        <li><Link to='/components/example'>Example</Link></li>
        <li><Link to='/components/test'>Test</Link></li>
        <li><Link to='/components/example-class'>Example Class</Link></li>
        <li><Link to='/components/profile-img'>Profile Image</Link></li>
      </ul>
      <h1>Views</h1>
      <ul>
        <li><Link to='/views/example'>Example View</Link></li>
        <li><Link to='/views/test'>Test View</Link></li>
      </ul>
    </div>
  )
};
