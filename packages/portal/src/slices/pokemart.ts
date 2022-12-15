import { Config, Response } from 'src/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTreeFromFlattenArray, NestedTreeNode } from 'src/utils/functions';

export interface Category {
  id: number;
  name: string;
  description: string;
  parentId: null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Product {
  id: number;
  name: string;
  currentPurchased: number;
  limitPurchase: number | null;
  limitPerUser: number | null;
  sku: string;
  price: number;
  discountId: number | null;
  image: string | null;
  availabledAt: string | null;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  category: Category;
  description: string;
}

export const pokemartSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${Config.API_URL}` }),
  reducerPath: 'pokemart',
  tagTypes: ['Category', 'Product'],
  endpoints: (builder) => ({
    getCategories: builder.query<NestedTreeNode<Category>[], void>({
      query: () => `categories`,
      providesTags: (result) => [
        'Category',
        ...(result || []).map(({ id }) => ({
          type: 'Category' as const,
          id
        }))
      ],
      transformResponse: (response: Response<Category[]>) =>
        getTreeFromFlattenArray(response.data, 'id', 'parentId')
    }),
    getProducts: builder.query<
      Product[],
      { category?: string; limit?: number; offset?: number }
    >({
      query: (params) => ({ url: 'products', params }),
      providesTags: (_result, _err, arg) => [
        {
          type: 'Product' as const,
          id: arg.category
        }
      ],
      transformResponse: (response: Response<Product[]>) => response.data
    })
  })
});

export const { useGetCategoriesQuery, useGetProductsQuery } = pokemartSlice;
