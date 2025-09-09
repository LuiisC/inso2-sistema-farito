import logotype from "../components/logo_farito.jpeg";

const Header = () => {
  return (
    <header>
        <nav className="navbar-light bg-white text-center">
                        <a className="navbar-brand" href="#">
                            <img src={logotype} width="60" height="60" className="d-inline-block align-center" alt="" />
                            FARITO
                        </a>
                    </nav>
    </header>
  )
}

export default Header