import react from 'react';

import Button from '../../components/ui/Button';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-100">
      <img src="https://accountingdrive.com/wp-content/uploads/2022/08/404-removebg-preview.png" alt="notfound"/>
      <Link to="/">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <FaHome className="inline mr-2" />
          Retour à l'accueil
        </Button>
      </Link>
    </div>
  );
}
export default NotFound;