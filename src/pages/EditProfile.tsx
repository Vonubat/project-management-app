import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Page from 'components/Page';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { getUser, userSelector } from 'store/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';

const boxStyles = {
  marginBottom: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: 1,
  p: 2,
};

//TODO refactor with AuthPage boxStyles
const avatarStyle = {
  m: 1,
  bgcolor: 'secondary.main',
};

const EditProfile = () => {
  const { login, name } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Page>
      <Container maxWidth="xs" sx={containerStyle}>
        <Box sx={boxStyles}>
          <Avatar sx={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User profile
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={1} alignItems="center" rowSpacing={4}>
            <Grid item xs={12}>
              <Typography variant="h5">NAME: {name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">LOGIN: {login}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" startIcon={<EditIcon />}>
                Edit profile
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />}>
                Delete account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default EditProfile;
