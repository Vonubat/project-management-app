import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, useMediaQuery, IconButton, Zoom } from '@mui/material';
import { Edit, Delete, AdminPanelSettings, Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch, useAppSelector, useMouseHover } from 'hooks/hooks';
import { deleteBoard, deleteLocalBoard, updateBoard } from 'store/boardListSlice';
import { Path } from 'constants/routing';
import { BoardData } from 'types/boards';
import { openModalForm, setBoardParams } from 'store/modalSlice';
import { MediaQuery, TypeofModal } from 'constants/constants';
import { authSelector } from 'store/authSlice';
import { usersSelector } from 'store/usersSlice';

type Props = {
  boardData: BoardData;
};

enum ModalTypeEnum {
  del,
  leave,
  showOwner,
}

const BoardPreview: FC<Props> = ({ boardData }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { _id, title, description, owner } = boardData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalTypeEnum>(0);
  const [boardRef, boardHovered] = useMouseHover<HTMLDivElement>();
  const isLaptopScreen = useMediaQuery(MediaQuery.laptop);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(authSelector);
  const { users } = useAppSelector(usersSelector);
  const isOwner = userId == owner;
  const ownerName = users.find((user) => user._id === owner)?.name;

  function submitDel() {
    dispatch(deleteBoard(_id));
    dispatch(deleteLocalBoard(_id));
    closeModal();
  }

  function submitLeave() {
    const { _id, ...params } = boardData;
    const leaveBoardParams = { ...params, users: params.users.filter((u) => u !== userId) };
    dispatch(updateBoard([_id, leaveBoardParams]));
    dispatch(deleteLocalBoard(_id));
    closeModal();
  }

  function openModal(modalType: ModalTypeEnum) {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(true);
      setModalType(modalType);
      event.stopPropagation();
    };
  }

  function modalProps() {
    switch (modalType) {
      case ModalTypeEnum.del:
        return {
          title: t('delBoard'),
          onSubmit: submitDel,
        };
      case ModalTypeEnum.leave:
        return {
          title: t('leaveBoard'),
          onSubmit: submitLeave,
        };
      case ModalTypeEnum.showOwner:
        return {
          title: `${t('ownerBoard')}: ${ownerName}`,
        };
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditBoardModalForm(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(setBoardParams(boardData));
    dispatch(openModalForm(TypeofModal.board));
    event.stopPropagation();
  }

  return (
    // TODO check is disabled prop is needed
    <>
      <Button
        component="div"
        variant="contained"
        disableRipple
        disabled={false}
        ref={boardRef}
        color={isOwner ? 'primary' : 'secondary'}
        onClick={() => navigate(`${Path.boards}/${_id}`)}
      >
        <Box display="flex" flexDirection="column" sx={{ width: 278, height: 144 }}>
          <Box display="flex" justifyContent="space-between" pb={0.5} pl={0.5} alignItems="center">
            <Typography variant="h6" noWrap sx={{ width: 200 }}>
              {title}
            </Typography>
            <Zoom in={!isLaptopScreen || boardHovered}>
              <Box>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={isOwner ? openEditBoardModalForm : openModal(ModalTypeEnum.showOwner)}
                >
                  {isOwner ? <Edit /> : <AdminPanelSettings />}
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={isOwner ? openModal(ModalTypeEnum.del) : openModal(ModalTypeEnum.leave)}
                >
                  {isOwner ? <Delete /> : <Logout />}
                </IconButton>
              </Box>
            </Zoom>
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
        </Box>
      </Button>
      <ConfirmModal isOpen={isOpen} onClose={closeModal} {...modalProps()} />
    </>
  );
};

export default BoardPreview;
