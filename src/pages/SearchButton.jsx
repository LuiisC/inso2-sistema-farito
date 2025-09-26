import SearchB from "../components/search_22.svg";

const SearchButton = ({ code, onSearch }) => {
  const handleClick = () => {
    if (!code || !code.trim()) {
      alert("Debe introducir un código de equipo");
      return;
    }
    onSearch?.();
  };

  return (
    <button
      className="btn btn-outline-secondary bg-white mr-2"
      onClick={handleClick}
    >
      <img src={SearchB} alt="Buscar" />
    </button>
  );
};

export default SearchButton;
