import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AdminPanelSettings, Delete, Edit, Logout } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  Zoom,
} from '@mui/material';
import { TypeofModal } from 'constants/constants';
import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { useMouseHover } from 'hooks/useMouseHover';
import { authSelector } from 'store/authSlice';
import { deleteBoard, deleteLocalBoard, updateBoard } from 'store/boardListSlice';
import { openModalForm, setBoardParams } from 'store/modalSlice';
import { usersSelector } from 'store/usersSlice';
import { BoardData } from 'types/boards';
import isTouchEnabled from 'utils/isTouchEnabled';

import ConfirmModal from './ConfirmModal';

type Props = {
  boardData: BoardData;
};

enum ModalTypeEnum {
  del,
  leave,
  showOwner,
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      mr: 0.5,
      fontSize: '1rem',
      width: 24,
      height: 24,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const BoardPreview: FC<Props> = ({ boardData }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { _id, title, description, owner } = boardData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalTypeEnum>(0);
  const [boardRef, boardHovered] = useMouseHover<HTMLDivElement>();
  const isTouchScreenDevice = isTouchEnabled();
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
    <>
      <Button
        component="div"
        variant="contained"
        disableRipple
        ref={boardRef}
        color={isOwner ? 'primary' : 'secondary'}
        onClick={() => navigate(`${Path.boards}/${_id}`)}
      >
        <Box display="flex" flexDirection="column" sx={{ width: 278, height: 144 }}>
          <Box display="flex" justifyContent="space-between" pb={0.5} pl={0.5} alignItems="center">
            <Typography variant="h6" noWrap sx={{ width: 200 }}>
              {title}
            </Typography>
            <Zoom in={isTouchScreenDevice || boardHovered}>
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
          {users.length && (
            <AvatarGroup
              max={5}
              spacing={1}
              componentsProps={{
                additionalAvatar: {
                  sx: {
                    width: 24,
                    height: 24,
                    fontSize: '1rem',
                    bgcolor: 'secondary.main',
                  },
                },
              }}
            >
              {boardData.users.map((uId) => (
                <Avatar
                  key={uId}
                  {...stringAvatar(
                    Object.values(users.find((u) => u._id === uId)!)
                      .splice(1, 2)
                      .join(' ')
                  )}
                />
              ))}
            </AvatarGroup>
          )}
        </Box>
      </Button>
      <ConfirmModal isOpen={isOpen} onClose={closeModal} {...modalProps()} />
    </>
  );
};

export default BoardPreview;
