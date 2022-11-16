import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';
import { titleInput, descriptionInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { FormControl } from 'types/formInput';
import { EditBoardFormFields } from 'types/boards';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { authSelector } from 'store/authSlice';
import { editBoard, createBoard } from 'store/boardListSlice';
import { setBoardLoading } from 'store/boardListSlice';

const EditBoardForm: FC = () => {
  const { userId } = useAppSelector(authSelector);
  const { isOpen, boardData } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
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
    const boardParams = { ...data, owner: userId as string, users: [] };
    if (boardData) {
      dispatch(editBoard([boardData._id, boardParams]));
      dispatch(setBoardLoading(boardData._id));
    } else {
      dispatch(createBoard(boardParams));
    }

    dispatch(closeModalForm());
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled(!isValid));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({
        title: boardData ? boardData.title : '',
        description: boardData ? boardData.description : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <ModalWithForm modalTitle={boardData ? t('edit') : t('add')} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={titleInput} />
      <ControlledFormInput control={formControl} inputOptions={descriptionInput} />
    </ModalWithForm>
  );
};

export default EditBoardForm;
