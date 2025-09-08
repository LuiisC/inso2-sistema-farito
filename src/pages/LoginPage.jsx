import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [intentos, setIntentos] = useState(3);
  const [error, setError] = useState('');
  const [bloqueado, setBloqueado] = useState(false);

  const navigate = useNavigate();

      // Simulación de login
    const mockUsuarios = [
      { nombre: 'tecnico1', rol: 'TECNICO', token: 'token-tecnico' },
      { nombre: 'tecnico2', rol: 'TECNICO', token: 'tecnico2' },
      { nombre: 'jefe1', rol: 'JEFE', token: 'token-jefe' }
    ];
    
  //const usuarioValido = mockUsuarios.find(u => u.nombre === usuario);
  const indexUser = mockUsuarios.findIndex(u => u.nombre === usuario);
  const usuarioValido = mockUsuarios[indexUser];

  //const usuarioValido = 'tecnico';
  //const contrasenaValida = '1234';

  const handleLogin = () => {
    

    if (bloqueado) return;

    // Validar campos vacíos
    if (!usuario.trim() || !contrasena.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    //Validar credenciales
    if (usuario === usuarioValido.nombre && contrasena === usuarioValido.token) {
      if (usuarioValido.rol === 'TECNICO') {
        console.log("Entro correctamente como tecnico")
        setError('');
        navigate('/home');
      }
      else if (usuarioValido.rol === 'JEFE') {
        setError('');
        navigate('/homejefe');
      }
    } else {
      const nuevosIntentos = intentos - 1;
      setIntentos(nuevosIntentos);

      if (nuevosIntentos <= 0) {
        setBloqueado(true);
        setError('Cuenta bloqueada por demasiados intentos fallidos ❌');
      } else {
        setError(`Usuario o contraseña incorrectos. Te quedan ${nuevosIntentos} intento(s).`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["left-panel"]}>
        <div className={styles.logo}>
          <img src="/logo Farito.png" alt="Faro" />
          <h1>F   A   R   I   T   O</h1>
        </div>
      </div>

      <div className={styles["right-panel"]}>
        <h2>¡Bienvenidos de vuelta!</h2>

        <div className={styles["form-group"]}>
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={bloqueado}
          />
        </div>

        <div className={styles["form-group"]}>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            disabled={bloqueado}
          />
        </div>

        <div className={styles["forgot-password"]}>
          <a href="#">¿Has olvidado tu contraseña?</a>
        </div>

        {error && <div className={styles["error-message"]}>{error}</div>}

        <button className={styles["login-btn"]} onClick={handleLogin} disabled={bloqueado}>
          Iniciar sesión
        </button>
      </div>

      <div className={styles.rectangular}>
        <div className={styles["linea-vertical"]}></div>
        <img className={styles.Izq} src="/logo rentas.png" alt="Rentas" />
        <img className={styles.Der} src="/logo Jujuy.png" alt="Gobierno de Jujuy" />
      </div>
    </div>
  );
};

export default LoginPage;