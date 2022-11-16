import React, { useCallback, useEffect, useState } from 'react';
import { Language } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LangType, LANG_TYPE } from 'constants/constants';
import HeaderLangButton from './HeaderLangButton';
import getLangType from 'utils/getLangType';

const LanguageBox = () => {
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'buttonText' });
  const [lang, setLang] = useState<LangType>(getLangType());

  const langMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const langMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const changeLanguage = useCallback((langType: LangType) => {
    setLang(langType);
    langMenuClose();
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_TYPE, lang);
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <>
      <HeaderLangButton startIcon={<Language />} onClick={langMenuOpen} buttonText={t('lang')} />
      <Menu
        anchorEl={langMenuAnchor}
        keepMounted
        open={Boolean(langMenuAnchor)}
        onClose={langMenuClose}
        disableScrollLock={true}
      >
        <MenuItem onClick={() => changeLanguage(LangType.en)}>{t('en')}</MenuItem>
        <MenuItem onClick={() => changeLanguage(LangType.ru)}>{t('ru')}</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageBox;
