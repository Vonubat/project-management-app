import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
// import styled from '@emotion/styled';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  // Divider,
  Link,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
// import { teal } from '@mui/material/colors';
import { MediaQuery } from 'constants/constants';
import { Path } from 'constants/routing';
import { useAppSelector } from 'hooks/typedHooks';
import { authSelector } from 'store/authSlice';

import AlexanderSUSAvatar from '../assets/avatars/alexandersus.png';
import AntonShcherbaAvatar from '../assets/avatars/anton-shcherba.png';
import VonubatAvatar from '../assets/avatars/vonubat.jpg';
import Logo1 from '../assets/logo_1.png';
import Logo2 from '../assets/logo_2.svg';
import Tutorial1 from '../assets/tutorials/build_the_workflow.mp4';
import Tutorial2 from '../assets/tutorials/tasks_contain_everything.mp4';
import Tutorial3 from '../assets/tutorials/unlimited_boards_columns_tasks.mp4';

type Props = {
  children?: React.ReactNode;
  breakPoint?: boolean;
  isReverse?: boolean;
  width?: string;
  source?: string;
  sx?: SxProps<Theme>;
};

const SectionWrapper: FC<Props> = ({ children, breakPoint, isReverse }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: breakPoint ? `row${isReverse ? '-reverse' : ''}` : 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      gap: '1rem',
      width: breakPoint ? width : '100%',
    }}
  >
    {children}
  </Box>
);

const TextTitle: FC<Props> = ({ children, sx }) => (
  <Typography
    variant="h3"
    sx={{
      ...sx,
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
    sx={{ minWidth: 200, maxWidth: 1000, width: breakPoint ? width : '100%', borderRadius: '1rem' }}
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

/* const StyledDivider = styled(Divider)({
  height: '1px',
  backgroundColor: teal[900],
}); */

const Home = () => {
  const { isAuth } = useAppSelector(authSelector);
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const isLargeScreen: boolean = useMediaQuery(MediaQuery.minWidth715);

  return (
    <Box
      component="main"
      sx={{
        py: 5,
        background: 'white',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5rem',
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
        {/* <StyledDivider /> */}
        <SectionWrapper breakPoint={isLargeScreen}>
          <ColumnWrapper breakPoint={isLargeScreen} width="40%">
            <Diversity1Icon sx={{ fontSize: 100 }} />
            <TextTitle>{t('sectionTitle_2')}</TextTitle>
            <TextBody>{t('sectionBody_2')}</TextBody>
          </ColumnWrapper>
          <VideoTutorial source={Tutorial1} breakPoint={isLargeScreen} width="60%" />
        </SectionWrapper>
        {/* <StyledDivider /> */}
        <SectionWrapper breakPoint={isLargeScreen} isReverse={true}>
          <ColumnWrapper breakPoint={isLargeScreen} width="40%">
            <PlaylistAddCheckIcon sx={{ fontSize: 100 }} />
            <TextTitle>{t('sectionTitle_3')}</TextTitle>
            <TextBody>{t('sectionBody_3')}</TextBody>
          </ColumnWrapper>
          <VideoTutorial source={Tutorial2} breakPoint={isLargeScreen} width="60%" />
        </SectionWrapper>
        {/* <StyledDivider /> */}
        <SectionWrapper breakPoint={isLargeScreen}>
          <ColumnWrapper breakPoint={isLargeScreen} width="40%">
            <DashboardCustomizeIcon sx={{ fontSize: 100 }} />
            <TextTitle>{t('sectionTitle_4')}</TextTitle>
            <TextBody>{t('sectionBody_4')}</TextBody>
          </ColumnWrapper>
          <VideoTutorial source={Tutorial3} breakPoint={isLargeScreen} width="60%" />
        </SectionWrapper>
        {/* <StyledDivider /> */}
        <ColumnWrapper>
          <Box component="img" src={Logo2} sx={{ width: '100%' }}></Box>
          <TextTitle sx={{ textAlign: 'center' }}>{t('team')}</TextTitle>
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
      </Container>
    </Box>
  );
};

export default Home;
