import { alpha, Box, Button, Stack, styled, Typography } from '@mui/material';

const IMAGE_ADDRESS = 'https://media.zicxa.com/358862';

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 80px)',
  backgroundImage: `url(${IMAGE_ADDRESS})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  boxShadow: `inset 0px 80px 90px ${theme.colors.custom.dark}`,
  padding: 0,
  position: 'relative'
}));

const StyledButton = styled(Button)({
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold'
});

const BottomBlur = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  height: 260,
  width: '100%',
  backgroundColor: alpha(theme.colors.custom.dark, 0.4),
  boxShadow: `0px -11px 9px ${alpha(theme.colors.custom.dark, 0.4)}`
}));

const AdvertiseTitleZone = styled(Box)(({ theme }) => ({
  position: 'absolute',
  textTransform: 'uppercase',
  bottom: theme.spacing(5),
  left: theme.spacing(7),
  width: 500,
  zIndex: 100
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  width: 'fit-content',
  marginTop: theme.spacing(2),
  textTransform: 'uppercase',
  fontWeight: 'bold'
}));

function Overview() {
  return (
    <ImageContainer>
      <Stack direction="row" spacing={8} p={2} pl={7}>
        <StyledButton>Pokeballs</StyledButton>
        <StyledButton>Potions</StyledButton>
        <StyledButton>Mistery Boxs</StyledButton>
        <StyledButton>Stones</StyledButton>
        <StyledButton>Berries</StyledButton>
      </Stack>
      <AdvertiseTitleZone>
        <Stack>
          <Typography
            variant="body2"
            color="ghostwhite"
            fontWeight="bolder"
            fontSize="1.5em"
          >
            New form - new power
          </Typography>
          <Typography
            variant="caption"
            color="white"
            fontWeight="bolder"
            fontSize="2.7em"
          >
            THE MEGA EVOLUTION ERA
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            fontSize="1em"
            textTransform="none"
          >
            Catch all the powerful Pokemons with new Mega evolution form and
            they will take you to the top of the world.
          </Typography>
          <LearnMoreButton variant="contained">
            Learn more {'>>'}
          </LearnMoreButton>
        </Stack>
      </AdvertiseTitleZone>
      <BottomBlur />
    </ImageContainer>
  );
}

export default Overview;
