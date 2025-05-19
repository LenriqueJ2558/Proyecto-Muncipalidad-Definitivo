import { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import logo from '../image/buo.png';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.16.246:3003/api/auth/signin', {
        Correo: correo,
        Contraseña: contraseña,
      });

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('Nombre', response.data.Nombre);
      localStorage.setItem('TipoRol', response.data.TipoRol);

      window.location.href = "/dashboard/home";
    } catch (error) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="back-white">
      <div className="main-content1">
        <div className="company__info">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Sub Gerencia de Seguridad Ciudadana</h2>
        </div>
        <div className="login_form">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder='Ingrese su correo'
                className="form__input"
              />
            </div>
            <div className='inputpass'>
              <label>Contraseña:</label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                placeholder='Ingrese su contraseña'
                className="form__input"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="enter-button">
              <button type="submit" className="button">Ingresar</button>
            </div>
          </form><br />
          <p className='copyright'>copyright © CIEM 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Login;