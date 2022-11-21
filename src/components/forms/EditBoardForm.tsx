import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';
import UserSearchBar from 'components/UserSearchBar';
import { titleInput, descriptionInput } from 'constants/inputs';
import { TypeofModal } from 'constants/constants';
import { FormControl } from 'types/formInput';
import { EditBoardFormFields } from 'types/boards';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { authSelector } from 'store/authSlice';
import { updateBoard, createBoard, updateLocalBoard } from 'store/boardListSlice';
import { Add as AddIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Chip, Collapse, Grow } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { usersSelector } from 'store/usersSlice';
import CustomPaper from 'components/UI/CustomPaper';

const EditBoardForm: FC = () => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.board}`;
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { userId } = useAppSelector(authSelector);
  const { users } = useAppSelector(usersSelector);
  const { [isOpenKey]: isOpen, boardData } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<EditBoardFormFields>({
    defaultValues: {
      title: boardData ? boardData.title : '',
      description: boardData ? boardData.description : '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: EditBoardFormFields) => {
    const boardParams = { ...data, owner: userId as string, users: checkedUsersID };
    if (boardData) {
      dispatch(updateBoard([boardData._id, boardParams]));
      dispatch(updateLocalBoard([boardData._id, boardParams]));
    } else {
      dispatch(createBoard(boardParams));
    }
    dispatch(closeModalForm(TypeofModal.board));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.board, flag: !isValid }));
  }, [isValid, dispatch]);

  useEffect(() => {
    setCheckedUsersID(boardData?.users || []);
    setSearchWin(false);
    if (isOpen) {
      reset({
        title: boardData ? boardData.title : '',
        description: boardData ? boardData.description : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const [isSearchWin, setSearchWin] = useState(false);
  const [checkedUsersID, setCheckedUsersID] = useState<string[]>([]);
  const checkedUsers = users.filter(({ _id }) => checkedUsersID.includes(_id));

  function handleToggle(value: string) {
    const curInd = checkedUsersID.indexOf(value);
    const newChecked = [...checkedUsersID];
    curInd === -1 ? newChecked.push(value) : newChecked.splice(curInd, 1);
    setCheckedUsersID(newChecked);
  }

  return (
    <ModalWithForm
      modalTitle={boardData ? t('edit') : t('add')}
      onSubmit={handleSubmit(onSubmit)}
      uniqueId={TypeofModal.board}
    >
      <Collapse in={!isSearchWin}>
        <ControlledFormInput control={formControl} inputOptions={titleInput} />
        <ControlledFormInput control={formControl} inputOptions={descriptionInput} />
      </Collapse>
      <Collapse in={isSearchWin}>
        <UserSearchBar
          userId={userId}
          users={users}
          checkedUsersID={checkedUsersID}
          handleToggle={handleToggle}
        />
      </Collapse>
      <CustomPaper>
        <TransitionGroup>
          <Grow in>
            <Chip
              color="primary"
              sx={{ ':hover': { cursor: 'pointer' }, m: 0.25 }}
              label={isSearchWin ? t('back') : t('addUsers')}
              icon={isSearchWin ? <ChevronLeftIcon /> : <AddIcon />}
              onClick={() => setSearchWin((prev) => !prev)}
            />
          </Grow>
          {checkedUsers.map(({ login, _id }) => (
            <Grow key={_id}>
              <Chip label={login} onDelete={() => handleToggle(_id)} sx={{ m: 0.25 }} />
            </Grow>
          ))}
        </TransitionGroup>
      </CustomPaper>
    </ModalWithForm>
  );
};

export default EditBoardForm;
