import React, { FC } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

type GitHubUserProps = {
  href: string;
};

const GitHubUser: FC<GitHubUserProps> = ({ href }) => (
  <IconButton size="medium" href={href} target="_blank" rel="noopener noreferrer">
    <GitHubIcon />
  </IconButton>
);

const actions = [
  { icon: <GitHubUser href={'https://github.com/Vonubat'} />, name: 'Vonubat' },
  { icon: <GitHubUser href={'https://github.com/AlexanderSUS'} />, name: 'AlexanderSUS' },
  { icon: <GitHubUser href={'https://github.com/anton-shcherba'} />, name: 'Anton-Shcherba' },
];

const SpeedDialGithub = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{ position: 'absolute', bottom: 5, right: 20, transform: 'translateZ(0px)', flexGrow: 1 }}
    >
      <SpeedDial
        ariaLabel="SpeedDialGithub"
        icon={<GitHubIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
            sx={{ whiteSpace: 'nowrap' }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default SpeedDialGithub;
