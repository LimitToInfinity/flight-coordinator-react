import { capitalize } from '../utilities/functions';

function Select({ name, onChange, defaultText, optionTexts }) {

  const renderOptions = () => optionTexts.map(optionText => {
    return (
      <option key={ optionText } value={ optionText }>
        { capitalize(optionText) }
      </option>
    );
  });

  return (
    <select id={ name } name={ name } onChange={ onChange }>
      <option value=''>{ defaultText }</option>
      { renderOptions() }
    </select>
  );
}

export default Select;