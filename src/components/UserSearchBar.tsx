import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpOkResponseData as UserData } from 'types/auth';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Divider,
  Paper,
  ListItemIcon,
} from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const checkListStyles = {
  width: 394,
  height: 153,
  bgcolor: 'background.paper',
  overflow: 'auto',
  pt: 0,
  mb: 0.2,
};

type Props = {
  userId: string | null;
  users: UserData[];
  checkedUsersID: string[];
  handleToggle(id: string): void;
};

const UserSearchBar: FC<Props> = ({ userId, users, checkedUsersID, handleToggle }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const [searchValue, setSearchValue] = useState('');
  const filteredUsers = users.filter(({ name, login, _id }) => {
    const lowName = name.toLowerCase();
    const lowLogin = login.toLowerCase();
    const lowSearchVal = searchValue.toLowerCase();
    return _id !== userId && (lowName.includes(lowSearchVal) || lowLogin.includes(lowSearchVal));
  });

  return (
    <Paper variant="outlined" sx={{ ':hover': { borderColor: 'black' }, mt: 2, mb: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t('search')}
          inputProps={{ 'aria-label': `${t('search')}` }}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </Search>
      <Divider />
      <List className="alternative-scroll" sx={checkListStyles}>
        {filteredUsers.map(({ name, login, _id }) => (
          <ListItem key={_id} disablePadding>
            <ListItemButton role={undefined} onClick={() => handleToggle(_id)} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={checkedUsersID.includes(_id)} disableRipple />
              </ListItemIcon>
              <ListItemText primary={name} secondary={login} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserSearchBar;
