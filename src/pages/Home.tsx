import { Avatar, Box, Button, CardMedia, Link, Typography, useMediaQuery } from '@mui/material';
import Page from 'components/Page';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Path } from 'constants/routing';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { authSelector } from 'store/authSlice';
import Logo1 from '../assets/logo_1.png';
import Logo2 from '../assets/logo_2.svg';
import VonubatAvatar from '../assets/avatars/vonubat.jpg';
import AlexanderSUSAvatar from '../assets/avatars/alexandersus.png';
import AntonShcherbaAvatar from '../assets/avatars/anton-shcherba.png';

type VideoTutorialProps = {
  children?: React.ReactNode;
  source: string;
};

type TeammateCardProps = {
  children?: React.ReactNode;
  avatar: string;
  name: string;
  role: string;
  link: string;
};

const Home = () => {
  const { isAuth } = useAppSelector(authSelector);
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const isLargeScreen = useMediaQuery('(min-width:715px)');

  const VideoTutorial: FC<VideoTutorialProps> = ({ source }) => (
    <CardMedia
      component="video"
      sx={{ minWidth: 200, flexGrow: 1, borderRadius: '1rem' }}
      image={source}
      autoPlay
      loop
      muted
      playsInline
    />
  );

  const TeammateCard: FC<TeammateCardProps> = ({ avatar, name, role, link }) => (
    <Link
      href={link}
      underline="none"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textAlign: 'center',
        p: 2,
        border: '1px dashed grey',
        width: 230,
        '&:hover': {
          border: '1px solid rgb(25, 118, 210)',
        },
      }}
    >
      <Avatar alt={name} src={avatar} sx={{ width: 200, height: 200, margin: 'auto' }} />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h6" color="text.secondary">
        {role}
      </Typography>
    </Link>
  );

  return (
    <Page
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        padding: '0 2rem',
        gap: '10rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: isLargeScreen ? '50%' : '100%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {t('sectionTitle_1')}
          </Typography>

          <Typography variant="h4">{t('sectionBody_1')}</Typography>

          <Button
            variant="contained"
            sx={{ width: 'fit-content' }}
            component={RouterLink}
            to={isAuth ? Path.boards : Path.signUp}
          >
            {t('startButton')}
          </Button>
        </Box>

        <Box
          component="img"
          src={Logo1}
          sx={{ maxWidth: '450px', width: isLargeScreen ? '50%' : '100%' }}
        ></Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: isLargeScreen ? '50%' : '100%',
          }}
        >
          <Diversity1Icon sx={{ fontSize: 100 }} />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {t('sectionTitle_2')}
          </Typography>

          <Typography variant="h4">{t('sectionBody_2')}</Typography>
        </Box>

        <VideoTutorial source="https://assets.codepen.io/6093409/river.mp4" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row-reverse' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: isLargeScreen ? '50%' : '100%',
          }}
        >
          <PlaylistAddCheckIcon sx={{ fontSize: 100 }} />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {t('sectionTitle_3')}
          </Typography>

          <Typography variant="h4">{t('sectionBody_3')}</Typography>
        </Box>

        <VideoTutorial source="https://assets.codepen.io/6093409/river.mp4" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: isLargeScreen ? '50%' : '100%',
          }}
        >
          <DashboardCustomizeIcon sx={{ fontSize: 100 }} />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {t('sectionTitle_4')}
          </Typography>

          <Typography variant="h4">{t('sectionBody_4')}</Typography>
        </Box>

        <VideoTutorial source="https://assets.codepen.io/6093409/river.mp4" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
        }}
      >
        <Box component="img" src={Logo2} sx={{ width: '100%' }}></Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        >
          {t('team')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
        >
          <TeammateCard
            avatar={VonubatAvatar}
            name={t('vonubat')}
            role={t('role')}
            link="https://github.com/Vonubat"
          />
          <TeammateCard
            avatar={AlexanderSUSAvatar}
            name={t('AlexanderSUS')}
            role={t('role')}
            link="https://github.com/AlexanderSUS"
          />
          <TeammateCard
            avatar={AntonShcherbaAvatar}
            name={t('AntonShcherba')}
            role={t('role')}
            link="https://github.com/Anton-Shcherba"
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
