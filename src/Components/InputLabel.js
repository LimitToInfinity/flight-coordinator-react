function InputLabel({ label, type, name, placeholder, onChange }) {
  return (
    <>
      <label htmlFor={ name }>{ label }</label>
      <input
        type={ type }
        id={ name }
        name={ name }
        placeholder={ placeholder }
        onChange={ onChange }
      />
    </>
  );
}

export default InputLabel;