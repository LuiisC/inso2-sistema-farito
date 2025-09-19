import SearchB from '../components/search_22.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {

const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Limpia el error cuando el usuario comienza a escribir
    if (error) {
      setError('');
    }
  };
  const handleClick = () => {
    // Valida que el campo no esté vacío
    if (inputValue.trim() === '') {
      //setError('El campo no puede estar vacío.');
      alert('Debe introducir un codigo de equipo')
      return; // Detiene la ejecución de la función
    }

    // Si la validación es exitosa, navega al historial
    navigate('/registro/historial');
  };

  return (
    <button className='btn btn-outline-secondary bg-white mr-2' onClick={handleClick}><img src={SearchB} alt="Buscar"/></button>
  )
}

export default SearchButton