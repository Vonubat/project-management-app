import React, { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { InputOptions } from 'types/formInput';

type Props = {
  inputOptions: InputOptions;
  control: Control<FieldValues, unknown>;
};

const ControlledFormInput: FC<Props> = ({
  inputOptions: { name, label, type, validationOptions, rows },
  control,
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            margin="normal"
            fullWidth
            label={t(label)}
            autoComplete="off"
            type={type}
            error={!!error}
            helperText={!!error ? t(`validationError.${error.message}`) : ''}
            multiline={!!rows}
            rows={rows}
            {...field}
          />
        </>
      )}
      rules={validationOptions}
    />
  );
};

export default ControlledFormInput;
