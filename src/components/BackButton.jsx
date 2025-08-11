import { useNavigate } from "react-router-dom";
import Button from './ui/Button';
import { FiArrowLeft } from 'react-icons/fi'; // Import d'une icône de flèche

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button 
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-200 shadow-md"
      onClick={() => navigate(-1)}
    >
      <FiArrowLeft className="text-lg" />
      <span>Retour</span>
    </Button>
  );
}

export default BackButton;