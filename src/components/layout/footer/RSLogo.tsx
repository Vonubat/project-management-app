import React, { FC } from 'react';
import { Box, Link } from '@mui/material';
import { GRAY_700 } from 'constants/constants';

import RSLogoIcon from '../../../assets/icons/logo-rs.svg';

const RSLogo: FC = () => (
  <Link href="https://rs.school/" color={GRAY_700} target="_blank" rel="noopener noreferrer">
    <Box
      component="img"
      sx={{
        pt: 1,
        height: 50,
        width: 130,
      }}
      alt="RSLogoIcon"
      src={RSLogoIcon}
    />
  </Link>
);

export default RSLogo;
