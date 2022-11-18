import React, { FC, useEffect } from 'react';
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
import { boardListSelector, updateBoard, createBoard, setBoardLoading } from 'store/boardListSlice';
import { Add as AddIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Chip, Collapse, Grow, Paper } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

const paperStyles = {
  display: 'flex',
  justifyContent: 'left',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  height: 78,
  p: 0.25,
  mt: 2,
  listStyle: 'none',
  overflow: 'auto',
  borderColor: 'white',
  outline: '1px solid #e6e6e6',
  ':hover': { outlineColor: 'black' },
};

const EditBoardForm: FC = () => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.board}`;
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { userId } = useAppSelector(authSelector);
  const { users } = useAppSelector(boardListSelector);
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
      dispatch(setBoardLoading(boardData._id));
    } else {
      dispatch(createBoard(boardParams));
    }
    dispatch(closeModalForm(TypeofModal.board));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled(!isValid));
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

  const [isSearchWin, setSearchWin] = React.useState(false);
  const [checkedUsersID, setCheckedUsersID] = React.useState<string[]>([]);
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
        <UserSearchBar users={users} checkedUsersID={checkedUsersID} handleToggle={handleToggle} />
      </Collapse>
      <Paper variant="outlined" className="alternative-scroll" sx={paperStyles}>
        <Chip
          color="primary"
          sx={{ ':hover': { cursor: 'pointer' }, m: 0.25 }}
          label={isSearchWin ? t('back') : t('addUsers')}
          icon={isSearchWin ? <ChevronLeftIcon /> : <AddIcon />}
          onClick={() => setSearchWin((prev) => !prev)}
        />
        <TransitionGroup>
          {checkedUsers.map(({ login, _id }) => (
            <Grow key={_id}>
              <Chip label={login} onDelete={() => handleToggle(_id)} sx={{ m: 0.25 }} />
            </Grow>
          ))}
        </TransitionGroup>
      </Paper>
    </ModalWithForm>
  );
};

export default EditBoardForm;
