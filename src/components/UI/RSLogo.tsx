import { Link, Box } from '@mui/material';
import RSLogoIcon from '../../assets/icons/logo-rs.svg';
import React, { FC } from 'react';
import { GRAY_700 } from 'constants/constants';

const RSLogo: FC = () => (
  <Link href="https://rs.school/" color={GRAY_700} target="_blank" rel="noopener noreferrer">
    <Box
      component="img"
      sx={{
        height: 50,
        width: 120,
        transition: 'all 0.5s',
        '&:hover': {
          transform: 'scale(95%)',
        },
      }}
      alt="RSLogoIcon"
      src={RSLogoIcon}
    />
  </Link>
);

export default RSLogo;
