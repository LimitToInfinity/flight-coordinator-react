import { Typography } from '@material-ui/core';

function MUITypography({ text, isParagraph }) {
  return (
    <Typography
      color='textSecondary'
      variant='overline'
      paragraph={ isParagraph || false }
    >
      { text }
    </Typography>
  );
}

export default MUITypography;