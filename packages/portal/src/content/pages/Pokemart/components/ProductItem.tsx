import {
  alpha,
  Box,
  Card,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { FunctionComponent } from 'react';
import { Product } from 'src/slices/pokemart';
import { formatNumber } from 'src/utils/functions';

interface ProductItemProps {
  product: Product;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: 400,
  background: 'transparent',
  border: `1px solid ${theme.colors.primary.lighter}`,
  boxShadow: `0px 9px 16px ${alpha(
    theme.colors.primary.main,
    0.18
  )}, 0px 2px 2px ${alpha(theme.colors.primary.main, 0.32)}`,
  maxWidth: 300,
  cursor: 'pointer',
  transition: 'border 0.5s, box-shadow 0.5s',

  '.product-item': {
    transition: 'transform 0.2s, transform-origin 0.1s',
    position: 'absolute'
  },

  '&:hover': {
    border: `1px solid ${theme.colors.primary.main}`,
    boxShadow: `0px 18px 32px ${alpha(
      theme.colors.primary.main,
      0.36
    )}, 0px 4px 4px ${alpha(theme.colors.primary.main, 0.64)}`,

    '.product-item': {
      transform: 'scale(1.3)',
      transformOrigin: 'center bottom'
    }
  }
}));

const StyledImage = styled('img')(() => ({
  width: 220,
  height: 220
}));

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <Box
        height={240}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StyledImage src="/static/images/gift.png" className="product-item" />
      </Box>
      <Stack alignItems="center" px={2}>
        <Tooltip arrow title={product.name}>
          <Typography
            fontWeight="bolder"
            fontSize="1.5rem"
            textTransform="uppercase"
            textAlign="center"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </Typography>
        </Tooltip>

        <Box height={75}>
          <Tooltip arrow title={product.description}>
            <Typography
              textAlign="center"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical'
              }}
              variant="subtitle2"
              color={theme.colors.alpha.white[50]}
            >
              {product.description}
            </Typography>
          </Tooltip>
        </Box>
        <Stack direction="row" spacing={1}>
          <img src="/static/images/icons/diamond.png" width={24} height={24} />
          <Typography fontWeight="bolder" fontSize="1.1rem" textAlign="center">
            {product.price > 0 ? formatNumber(product.price) : 'Free'}
          </Typography>
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default ProductItem;
