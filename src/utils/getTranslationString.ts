import { AnyAction } from '@reduxjs/toolkit';

export const getTranslationString = (action: AnyAction) => {
  const [sliceName, actionName] = action.type.split('/') as string[];

  return sliceName + actionName.charAt(0).toUpperCase() + actionName.slice(1);
};
