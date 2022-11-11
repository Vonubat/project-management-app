import { TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthInputOptions, AuthFormFields } from 'types/auth';

type Props = {
  inputOptions: AuthInputOptions;
  control: Control<AuthFormFields, unknown>;
};

const AuthFormInput: FC<Props> = ({
  inputOptions: { name, label, type, validationOptions },
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
            {...field}
          />
          {error && (
            <Typography variant="caption" color={'red'}>
              {t(`validationError.${error.message}`)}
            </Typography>
          )}
        </>
      )}
      rules={validationOptions}
    />
  );
};

export default AuthFormInput;
