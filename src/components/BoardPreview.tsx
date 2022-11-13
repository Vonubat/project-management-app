import React, { FC, useState } from 'react';
import { Button, Box, Typography, Paper, ButtonGroup, Tooltip } from '@mui/material';
import { Edit, OpenWith, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch } from 'hooks/hooks';
import { deleteBoard } from 'store/boardListSlice';

type Props = {
  boardTitle: string;
  id: string;
};

const BoardPreview: FC<Props> = ({ boardTitle, id }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { title, description } = JSON.parse(boardTitle) as { title: string; description: string };

  function submit() {
    dispatch(deleteBoard(id));
    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Button component="div" variant="contained" disableRipple>
      <Box display="flex" flexDirection="column" sx={{ width: 278, height: 298 }}>
        <Box>
          <Typography variant="h6" align="center" noWrap>
            {title}
          </Typography>
        </Box>
        <Paper
          variant="outlined"
          className="board-description"
          sx={{ flexGrow: 1, overflow: 'auto', wordWrap: 'break-word', mb: 1, p: 1 }}
        >
          <Typography variant="caption" align="justify" display="block">
            {description}
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
              <Button onClick={openModal}>
                <Delete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Box>
      <ConfirmModal title={t('delBoard')} isOpen={isOpen} onSubmit={submit} onClose={closeModal} />
    </Button>
  );
};

export default BoardPreview;
