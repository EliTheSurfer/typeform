import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/questionnaire');
  }, [navigate]);

  return null;
};

export default Welcome; 