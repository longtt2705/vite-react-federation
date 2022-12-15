import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import { CenterContainer } from 'src/components/CenterContainer';
import { useGetCategoriesQuery } from 'src/slices/pokemart';
import NestedTab from './components/NestedTab';

const Pokemart = () => {
  const { data: categories, isError, isLoading } = useGetCategoriesQuery();
  const theme = useTheme();

  if (isLoading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  if (isError || !categories) {
    return (
      <CenterContainer>
        <Typography variant="h6">Oh no, there was an error</Typography>
      </CenterContainer>
    );
  }

  return (
    <>
      <Box mb={5}>
        <Typography
          variant="h1"
          fontWeight="bolder"
          fontSize="5rem"
          textTransform="uppercase"
        >
          Pokemart
        </Typography>
        <Divider
          sx={{
            width: '100%',
            backgroundColor: theme.colors.alpha.trueWhite[100]
          }}
        />
      </Box>
      <NestedTab categories={categories} />
    </>
  );
};

export default Pokemart;
