import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, ButtonGroup, Tooltip } from '@mui/material';
import { Edit, OpenWith, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch } from 'hooks/hooks';
import { deleteBoard, deleteLocalBoard } from 'store/boardListSlice';
import { Path } from 'constants/routing';
import { BoardData } from 'types/boards';
import { openModalForm, setBoardParams } from 'store/modalSlice';
import { TypeofModal } from 'constants/constants';

type Props = {
  boardData: BoardData;
};

const BoardPreview: FC<Props> = ({ boardData }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { _id, title, description } = boardData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function submit() {
    dispatch(deleteBoard(_id));
    dispatch(deleteLocalBoard(_id));

    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditBoardModalForm() {
    dispatch(setBoardParams(boardData));
    dispatch(openModalForm(TypeofModal.board));
  }

  return (
    // TODO check is disabled prop is needed
    <Button component="div" variant="contained" disableRipple disabled={false}>
      <Box display="flex" flexDirection="column" sx={{ width: 278, height: 298 }}>
        <Box>
          <Typography variant="h6" align="center" noWrap>
            {title}
          </Typography>
        </Box>
        <Paper
          variant="outlined"
          className="alternative-scroll"
          sx={{ flexGrow: 1, overflow: 'auto', wordWrap: 'break-word', mb: 1, p: 1 }}
        >
          <Typography variant="caption" align="justify" display="block">
            {description}
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="center">
          <ButtonGroup variant="contained" color="warning">
            <Tooltip title={t('edit')} placement="top">
              <Button onClick={openEditBoardModalForm}>
                <Edit />
              </Button>
            </Tooltip>
            <Tooltip title={t('open')} placement="top">
              <Button onClick={() => navigate(`${Path.boards}/${_id}`)}>
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
