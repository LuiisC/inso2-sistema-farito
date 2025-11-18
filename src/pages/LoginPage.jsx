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
    { nombre: 'Cristian', rol: 'TECNICO', token: 'tecnico2' },
    { nombre: 'jefe1', rol: 'JEFE', token: 'token-jefe' }
  ];

  // se busca el usuario 
  const usuarioValido = mockUsuarios.find(u => u.nombre === usuario);

  const handleLogin = () => {
    // Si la cuenta está bloqueada, no se permite seguir intentando
    if (bloqueado) return;

    // Validar campos vacíos
    if (!usuario.trim() || !contrasena.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Validar si el usuario existe
    if (usuarioValido) {
      // Validar credenciales sensibles a mayúsculas o minúsculas
      if (contrasena === usuarioValido.token) {
        // Login correcto según el rol
        setError('');
        if (usuarioValido.rol === 'TECNICO') {
          console.log("Entró correctamente como técnico");
          navigate('/home');
        } else if (usuarioValido.rol === 'JEFE') {
          navigate('/homejefe');
        }
      } else {
        // Contraseña incorrecta
        const nuevosIntentos = intentos - 1;
        setIntentos(nuevosIntentos);

        if (nuevosIntentos <= 0) {
          setBloqueado(true);
          setError('Cuenta bloqueada por demasiados intentos fallidos ❌');
        } else {
          setError(`Contraseña incorrecta. Te quedan ${nuevosIntentos} intento(s).`);
        }
      }
    } else {
      // Usuario no encontrado
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

        {/* Campo Usuario */}
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

        {/* Campo Contraseña */}
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

        {/* Mensaje de error */}
        {error && <div className={styles["error-message"]}>{error}</div>}

        {/* Botón de login */}
        <button
          className={styles["login-btn"]}
          onClick={handleLogin}
          disabled={bloqueado}
        >
          Iniciar sesión
        </button>
      </div>

      {/* Pie con logotipos */}
      <div className={styles.rectangular}>
        <div className={styles["linea-vertical"]}></div>
        <img className={styles.Izq} src="/logo rentas.png" alt="Rentas" />
        <img className={styles.Der} src="/logo Jujuy.png" alt="Gobierno de Jujuy" />
      </div>
    </div>
  );
};

export default LoginPage;
