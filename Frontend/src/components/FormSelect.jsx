import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../css/formSelect.css'

const FormSelect = ({ id, label, register, errors, options, validation }) => (
  <div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">{label}</label>

    {/* Contenedor para ocultar la flecha y posicionar el icono */}
    <div className="position-relative">
      <select
        id={id}
        className={`form-select custom-select-arrow ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, validation)}
      >
        <option value="">Selecciona...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <FontAwesomeIcon
        icon={faChevronDown}
        className="position-absolute"
        style={{
          top: '50%',
          right: '15px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: '#6c757d',
        }}
      />
    </div>

    {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
  </div>
);
export default FormSelect;