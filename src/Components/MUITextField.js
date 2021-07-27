import React from 'react';

import { TextField } from '@material-ui/core';

function MUITextField({ name, type, onChange }) {

  const capitalize = string => {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <TextField
      id={ name }
      type={ type }
      name={ name }
      label={ capitalize(name) }
      autoComplete={`current-${name}`}
      variant="outlined"
      color="primary"
      margin="normal"
      onChange={ onChange }
    />
  );
}

export default MUITextField;