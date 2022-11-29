import React, { FC, useState } from 'react';
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { SignUpOkResponseData as UserData } from 'types/auth';

import SearchBar from 'components/SearchBar';

const checkListStyles = {
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
  const [searchValue, setSearchValue] = useState('');
  const filteredUsers = users.filter(({ name, login, _id }) => {
    const lowName = name.toLowerCase();
    const lowLogin = login.toLowerCase();
    const lowSearchVal = searchValue.toLowerCase();
    return _id !== userId && (lowName.includes(lowSearchVal) || lowLogin.includes(lowSearchVal));
  });

  return (
    <Paper variant="outlined" sx={{ ':hover': { borderColor: 'black' }, mt: 2, mb: 1 }}>
      <SearchBar value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
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
