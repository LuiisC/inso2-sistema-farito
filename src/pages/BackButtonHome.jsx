import { Link } from "react-router-dom";
import Arrow from "../components/arrow_back_40.svg";

const BackButtonHome = () => {
  return (
    <div className="d-flex align-items-center pb-2">
        <Link to="/home" >
            <img src={Arrow} alt="Regresar" className="p-1 bg-white rounded-2"/>
        </Link>
        <h5 className='text-white p-2 m-0'>Menú principal</h5>
    </div>
  )
}

export default BackButtonHome