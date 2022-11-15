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
import { MediaQuery } from 'constants/constants';

type Props = {
  children?: React.ReactNode;
  breakPoint?: boolean;
  isReverse?: boolean;
  width?: string;
  source?: string;
};

const SectionWrapper: FC<Props> = ({ children, breakPoint, isReverse }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: breakPoint ? `row${isReverse ? '-reverse' : ''}` : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
    }}
  >
    {children}
  </Box>
);

const ColumnWrapper: FC<Props> = ({ children, width, breakPoint }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      width: breakPoint ? width : '100%',
    }}
  >
    {children}
  </Box>
);

const TextTitle: FC<Props> = ({ children }) => (
  <Typography
    variant="h3"
    sx={{
      fontWeight: 'bold',
    }}
  >
    {children}
  </Typography>
);

const TextBody: FC<Props> = ({ children }) => <Typography variant="h4">{children}</Typography>;

const VideoTutorial: FC<Props> = ({ source, width, breakPoint }) => (
  <CardMedia
    component="video"
    sx={{ minWidth: 200, width: breakPoint ? width : '100%', borderRadius: '1rem' }}
    image={source}
    autoPlay
    loop
    muted
    playsInline
  />
);

const TeammateCardWrapper: FC<Props> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      width: '100%',
    }}
  >
    {children}
  </Box>
);

type TeammateCardProps = {
  children?: React.ReactNode;
  avatar: string;
  name: string;
  role: string;
  link: string;
};

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

const Home = () => {
  const { isAuth } = useAppSelector(authSelector);
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const isLargeScreen: boolean = useMediaQuery(MediaQuery.minWidth715);

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
      <SectionWrapper breakPoint={isLargeScreen}>
        <ColumnWrapper breakPoint={isLargeScreen} width="40%">
          <TextTitle>{t('sectionTitle_1')}</TextTitle>
          <TextBody>{t('sectionBody_1')}</TextBody>
          <Button
            variant="contained"
            sx={{ width: 'fit-content', whiteSpace: 'nowrap' }}
            component={RouterLink}
            to={isAuth ? Path.boards : Path.signUp}
          >
            {t('startButton')}
          </Button>
        </ColumnWrapper>
        <Box
          component="img"
          src={Logo1}
          sx={{ maxWidth: '450px', width: isLargeScreen ? '50%' : '100%' }}
        />
      </SectionWrapper>

      <SectionWrapper breakPoint={isLargeScreen}>
        <ColumnWrapper breakPoint={isLargeScreen} width="40%">
          <Diversity1Icon sx={{ fontSize: 100 }} />
          <TextTitle>{t('sectionTitle_2')}</TextTitle>
          <TextBody>{t('sectionBody_2')}</TextBody>
        </ColumnWrapper>
        <VideoTutorial
          source="https://assets.codepen.io/6093409/river.mp4"
          breakPoint={isLargeScreen}
          width="60%"
        />
      </SectionWrapper>

      <SectionWrapper breakPoint={isLargeScreen} isReverse={true}>
        <ColumnWrapper breakPoint={isLargeScreen} width="40%">
          <PlaylistAddCheckIcon sx={{ fontSize: 100 }} />
          <TextTitle>{t('sectionTitle_3')}</TextTitle>
          <TextBody>{t('sectionBody_3')}</TextBody>
        </ColumnWrapper>
        <VideoTutorial
          source="https://assets.codepen.io/6093409/river.mp4"
          breakPoint={isLargeScreen}
          width="60%"
        />
      </SectionWrapper>

      <SectionWrapper breakPoint={isLargeScreen}>
        <ColumnWrapper breakPoint={isLargeScreen} width="40%">
          <DashboardCustomizeIcon sx={{ fontSize: 100 }} />
          <TextTitle>{t('sectionTitle_4')}</TextTitle>
          <TextBody>{t('sectionBody_4')}</TextBody>
        </ColumnWrapper>
        <VideoTutorial
          source="https://assets.codepen.io/6093409/river.mp4"
          breakPoint={isLargeScreen}
          width="60%"
        />
      </SectionWrapper>

      <ColumnWrapper>
        <Box component="img" src={Logo2} sx={{ width: '100%' }}></Box>
        <TextTitle>{t('team')}</TextTitle>
        <TeammateCardWrapper>
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
        </TeammateCardWrapper>
      </ColumnWrapper>
    </Page>
  );
};

export default Home;
