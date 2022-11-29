import React, { FC, RefObject, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, TextField } from '@mui/material';
import { useAppDispatch } from 'hooks/typedHooks';
import { setCurrentColumnId, updateColumn, updateLocalColumn } from 'store/columnsSlice';

type Props = {
  closeEditBox: VoidFunction;
  title: string;
  columnId: string;
};

const EditLabelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const EditColumnTitleBox: FC<Props> = ({ closeEditBox, title, columnId }) => {
  const dispatch = useAppDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const boxRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const submitChange = useCallback(() => {
    const newTitle = inputRef.current!.value.trim();

    if (newTitle && newTitle !== title) {
      dispatch(setCurrentColumnId(columnId));
      dispatch(updateLocalColumn(newTitle));
      dispatch(updateColumn(newTitle));
    }

    closeEditBox();
  }, [closeEditBox, columnId, title, dispatch]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      (e.key === 'Esc' || e.key === 'Escape') && closeEditBox();
      e.key === 'Enter' && submitChange();
    },
    [closeEditBox, submitChange]
  );

  const handleClickOutSide = useCallback(
    (event: MouseEvent) => {
      const target = event.target as unknown as globalThis.Node;
      boxRef.current && !boxRef.current.contains(target) && closeEditBox();
    },
    [closeEditBox]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [handleKeydown, handleClickOutSide]);

  return (
    <EditLabelBox ref={boxRef} sx={{ mx: 1 }}>
      <TextField
        inputRef={inputRef}
        inputProps={{ maxLength: '40' }}
        defaultValue={title}
        hiddenLabel
        multiline
        autoFocus
        fullWidth
        size="small"
      />
      <Box sx={{ ml: 'auto', my: 0.25 }}>
        <IconButton aria-label="submit" onClick={submitChange}>
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="cancel" onClick={closeEditBox}>
          <CloseIcon />
        </IconButton>
      </Box>
    </EditLabelBox>
  );
};

export default EditColumnTitleBox;
