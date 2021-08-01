import { Button } from '@material-ui/core';

function MUIButton({ text, onClick }) {
  return (
    <Button
      type='submit'
      variant='outlined'
      color='primary'
      onClick={ onClick }
    >
      { text }
    </Button>
  );
}

export default MUIButton;