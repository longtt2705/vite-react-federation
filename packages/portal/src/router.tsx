import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader =
  (Component: React.LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );

// Pages
const Authentication = Loader(
  lazy(() => import('src/content/pages/Authentications'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);

const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const Overview = Loader(lazy(() => import('src/content/pages/Overview')));

const Pokemart = Loader(lazy(() => import('src/content/pages/Pokemart')));

const routes = (isAuth: boolean): RouteObject[] => {
  return [
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: isAuth ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Authentication />
          )
        },
        {
          path: 'status',
          children: [
            {
              path: '',
              element: <Navigate to="404" replace />
            },
            {
              path: '404',
              element: <Status404 />
            },
            {
              path: '500',
              element: <Status500 />
            },
            {
              path: 'maintenance',
              element: <StatusMaintenance />
            }
          ]
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },
    {
      path: 'dashboard',
      element: isAuth ? <SidebarLayout /> : <Navigate to="/auth" replace />,
      children: [
        {
          path: '',
          element: <Navigate to="overview" replace />
        },
        {
          path: 'overview',
          element: <Overview />
        },
        {
          path: 'profile',
          children: [
            {
              path: '',
              element: <Navigate to="details" replace />
            },
            {
              path: 'details',
              element: <UserProfile />
            },
            {
              path: 'settings',
              element: <UserSettings />
            }
          ]
        },
        {
          path: 'pokemart',
          element: <Pokemart />
        }
      ]
    }
  ];
};

export default routes;
