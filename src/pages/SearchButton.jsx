import SearchB from '../components/search_22.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchButton = ({ onClick }) => {
  
  return (
    <button 
      className='btn btn-outline-secondary bg-white mr-2'
      onClick={onClick}>
      <img src={SearchB} alt="Buscar"/>
    </button>
  )
}

export default SearchButton