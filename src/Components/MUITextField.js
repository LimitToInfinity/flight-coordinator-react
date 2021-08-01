import { TextField } from '@material-ui/core';

import { capitalize } from '../utilities/functions';

function MUITextField({ name, type, onChange }) {
  return (
    <TextField
      id={ name }
      type={ type }
      name={ name }
      label={ capitalize(name) }
      autoComplete={`current-${name}`}
      variant='outlined'
      color='primary'
      margin='normal'
      onChange={ onChange }
    />
  );
}

export default MUITextField;