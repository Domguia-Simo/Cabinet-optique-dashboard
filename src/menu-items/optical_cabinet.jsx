// assets
import { LoginOutlined, ProfileOutlined ,SettingOutlined ,MessageOutlined ,EditOutlined ,ContactsOutlined ,DatabaseFilled, DatabaseOutlined, BarChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const optical_cabinet = {
  id: 'optical_cabinet',
  title: 'Optical Cabinet',
  type: 'group',
  children: [
    {
      id: 'manage-product',
      title: 'Product',
      type: 'item',
      url: '/manage-product',
      icon: EditOutlined,
    //   target: true
    },
    {
        id: 'manage-consultation',
        title: 'Consultation',
        type: 'item',
        url: '/manage-consultation',
        icon: ContactsOutlined,  
    },
    {
        id: 'manage-transaction',
        title: 'Order | Transactions',
        type: 'item',
        url: '/manage-transaction',
        icon: DatabaseFilled,  
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/analytics',
      icon: BarChartOutlined,  
  },
    {
        id: 'manage-messages',
        title: 'Messages',
        type: 'item',
        url: '/manage-message',
        icon: MessageOutlined,  
    },
    {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        url: '/settings',
        icon: SettingOutlined,  
    }

  ]
};

export default optical_cabinet;
