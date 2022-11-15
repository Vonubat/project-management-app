import { TextareaAutosize } from '@mui/material';
import { GRAY_700 } from 'constants/constants';
import { useAppDispatch } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { updateColumn } from 'store/columnsSlice';

type TextareaProps = {
  children?: React.ReactNode;
  boardId: string;
  columnId: string;
  order: number;
  value: string;
};

const StyledTextarea: FC<TextareaProps> = ({ value, boardId, columnId, order }) => {
  const [hasFocus, setFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const dispatch = useAppDispatch();

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);

    if (currentValue.trim() === previousValue) {
      setCurrentValue(currentValue.trim());
      return;
    }

    if (currentValue.trim() === '') {
      setCurrentValue(previousValue);
      return;
    }

    dispatch(
      updateColumn({
        boardId,
        columnId,
        data: { title: currentValue, order },
      })
    );

    setPreviousValue(currentValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <TextareaAutosize
      minRows={2}
      style={{
        width: 240,
        padding: '5px 8px',
        fontSize: '20px',
        border: '0',
        borderRadius: '7px',
        cursor: 'pointer',
        resize: 'none',
        overflow: 'hidden',
        color: hasFocus ? 'black' : GRAY_700,
        outline: hasFocus ? '1px #b1b1b1 solid' : 'none',
        backgroundColor: hasFocus ? 'white' : 'transparent',
      }}
      value={currentValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default StyledTextarea;
