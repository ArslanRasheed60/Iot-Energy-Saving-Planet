import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

const extraNavTree = [
  {
    key: "extra",
    path: `${APP_PREFIX_PATH}/pages`,
    title: "sidenav.pages",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      // {
      //   key: "extra-pages-list",
      //   path: `${APP_PREFIX_PATH}/pages/user-list`,
      //   title: "sidenav.pages.userlist",
      //   icon: "",
      //   breadcrumb: true,
      //   submenu: [],
      // },
      {
        key: "extra-pages-setting",
        path: `${APP_PREFIX_PATH}/pages/setting`,
        title: "sidenav.pages.setting",
        icon: "",
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "sidenav.dashboard.default",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const appsNavTree = [
  {
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    title: "sidenav.apps",
    icon: AppstoreOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "apps-data",
        path: `${APP_PREFIX_PATH}/apps/data`,
        title: "sidenav.apps.data",
        icon: BulbOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const componentsNavTree = [];

const docsNavTree = [];

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...componentsNavTree,
  ...extraNavTree,
  ...docsNavTree,
];

export default navigationConfig;
