import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { CenterContainer } from 'src/components/CenterContainer';
import { useGetProductsQuery } from 'src/slices/pokemart';
import ProductItem from './ProductItem';

interface ProductPageProps {
  category: string;
}

const ProductPage: FunctionComponent<ProductPageProps> = ({ category }) => {
  const {
    data: products,
    isLoading,
    isError
  } = useGetProductsQuery({ category });

  if (isError) {
    return (
      <CenterContainer>
        <Typography variant="h6">Oh no, there was an error</Typography>
      </CenterContainer>
    );
  }

  return (
    <Box mt={10}>
      {isLoading ? (
        Array.from(Array(3).keys()).map((value) => (
          <Skeleton key={value} variant="rectangular" height={400} />
        ))
      ) : products && products.length ? (
        <Grid container spacing={5}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} md={6} sm={12} lg={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CenterContainer>
          <Typography>
            There is no products in <strong>{category}</strong> category to
            display!
          </Typography>
        </CenterContainer>
      )}
    </Box>
  );
};

export default ProductPage;
