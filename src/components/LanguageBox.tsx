import React, { BaseSyntheticEvent } from 'react';
import { Language } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LangType } from 'constants/constants';
import HeaderLangButton from './HeaderLangButton';

const LanguageBox = () => {
  const [langMenuAnchor, setLangMenuAnchor] = React.useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'buttonText' });

  const langMenuBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const closeLangMenu = (langType: LangType | BaseSyntheticEvent) => {
    setLangMenuAnchor(null);
    if (typeof langType === 'string') {
      i18n.changeLanguage(langType);
    }
  };

  return (
    <>
      <HeaderLangButton
        startIcon={<Language />}
        onClick={langMenuBtnClick}
        buttonText={t('lang')}
      />
      <Menu
        anchorEl={langMenuAnchor}
        keepMounted
        open={Boolean(langMenuAnchor)}
        onClose={closeLangMenu}
      >
        <MenuItem onClick={() => closeLangMenu(LangType.en)}>{t('en')}</MenuItem>
        <MenuItem onClick={() => closeLangMenu(LangType.ru)}>{t('ru')}</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageBox;
