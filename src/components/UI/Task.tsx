import React, { FC, useState } from 'react';
import { Typography } from '@mui/material';
import { DefaultColors, GRAY_700 } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import { deleteTask } from 'store/tasksSlice';
import ConfirmModal from 'components/ConfirmModal';
import DeleteBtn from './DeleteBtn';
import { theme } from 'components/Page';

type Props = {
  children?: React.ReactNode;
  taskTitle: string;
  columnId: string;
  boardId: string;
  taskId: string;
  order: number;
};

const Task: FC<Props> = ({ taskTitle, boardId, columnId, taskId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(deleteTask({ boardId, columnId, taskId }));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        minWidth: 280,
        maxWidth: 280,
        maxHeight: 40,
        minHeight: 40,
        margin: '0 1rem',
        padding: '5px',
        borderRadius: '3px',
        fontSize: 20,
        color: GRAY_700,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        cursor: 'pointer',
        boxShadow: `${theme.shadows[3]}`,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Typography variant="h6" noWrap>
        {taskTitle}
      </Typography>
      {isHovering && <DeleteBtn size="small" color={DefaultColors.error} cb={openModal} />}
      <ConfirmModal title={t('delTask')} isOpen={isOpen} onSubmit={submit} onClose={closeModal} />
    </div>
  );
};

export default Task;

{
}
