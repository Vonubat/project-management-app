import Page from 'components/Page';
import React, { useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Home = () => {
  const form = useForm();
  const { handleSubmit, reset, register } = form;

  const onFormSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {};

  const resetForm: () => void = useCallback((): void => {
    reset({ file: '', test1: '', test2: '' });
  }, [reset]);

  return (
    <Page>
      <form
        style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          {...register('file')}
          type="file"
          id="file"
          accept="image/png, image/gif, image/jpeg"
        />

        <input {...register('test1')} type="text" placeholder="test1" id="test1" />

        <input {...register('test2')} type="text" placeholder="test2" id="test2" />

        <div className="flex gap-4">
          <button role="submit"> Submit</button>
          <button role="reset" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
      <h1>Here will be description</h1>
    </Page>
  );
};

export default Home;
