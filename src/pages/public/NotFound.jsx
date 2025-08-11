import react from 'react';

import Button from '../../components/ui/Button';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-100">
      <img src="https://accountingdrive.com/wp-content/uploads/2022/08/404-removebg-preview.png" alt="notfound"/>
      <Link to="/">
        <BackButton />
      </Link>
    </div>
  );
}
export default NotFound;