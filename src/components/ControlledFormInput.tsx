import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputOptions } from 'types/formInput';

type Props = {
  controlSize?: number;
  inputOptions: InputOptions;
  control: Control<FieldValues, unknown>;
};

const ControlledFormInput: FC<Props> = ({
  inputOptions: { name, label, type, validationOptions },
  control,
  controlSize,
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            multiline
            rows={controlSize || 1}
            margin="normal"
            fullWidth
            label={t(label)}
            autoComplete="off"
            type={type}
            error={!!error}
            helperText={!!error ? t(`validationError.${error.message}`) : ''}
            {...field}
          />
        </>
      )}
      rules={validationOptions}
    />
  );
};

export default ControlledFormInput;
