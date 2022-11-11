import React from 'react';
import { Button, Box, Typography, Paper, ButtonGroup, Tooltip } from '@mui/material';
import { Edit, OpenWith, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import ConfirmModal from './ConfirmModal';

export default function BoardPreview(props: { name: string; description: string }) {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const [isOpenDelModal, setOpenDelModal] = React.useState(false);

  function agreeDelModal() {
    setOpenDelModal(false);
  }

  function closeDelModal() {
    setOpenDelModal(false);
  }

  return (
    <Button component="div" variant="contained" disableRipple>
      <Box display="flex" flexDirection="column" sx={{ width: 278, height: 298 }}>
        <Box>
          <Typography variant="h6" align="center" noWrap>
            {props.name}
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ flexGrow: 1, overflow: 'auto', mb: 1, p: 1 }}>
          <Typography variant="caption" align="justify" display="block">
            {props.description}
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="center">
          <ButtonGroup variant="contained" color="warning">
            <Tooltip title={t('edit')} placement="top">
              <Button>
                <Edit />
              </Button>
            </Tooltip>
            <Tooltip title={t('open')} placement="top">
              <Button>
                <OpenWith />
              </Button>
            </Tooltip>
            <Tooltip title={t('remove')} placement="top">
              <Button
                onClick={() => {
                  setOpenDelModal(true);
                }}
              >
                <Delete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Box>
      <ConfirmModal
        title={t('delBoard')}
        isOpen={isOpenDelModal}
        agree={agreeDelModal}
        close={closeDelModal}
      />
    </Button>
  );
}
