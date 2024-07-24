import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ManageProducts from 'pages/products/Product';
import Consultation from 'pages/Consultations/Consultation';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    // Custom routes
    {
      path:"/manage-product",
      element:<ManageProducts/>
    },
    {
      path:"/manage-consultation",
      element:<Consultation/>
    },
    {
      path:'/manage-transaction',
      element:()=><div>Transaction page</div>
    },
    {
      path:"/manage-message",
      element:()=><div>Message page</div>
    },
    {
      path:"/settings",
      element:()=><div>Setting page</div>
    },


    // Existing defined routes
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
