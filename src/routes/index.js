import React from "react";
import { Redirect } from "react-router-dom";

// // Pages Component
// import Chat from "../pages/Chat/Chat";

// // Pages Calendar
// import Calendar from "../pages/Calendar/index";

// //Tasks
// import TasksList from "../pages/Tasks/tasks-list";
// import TasksKanban from "../pages/Tasks/tasks-kanban";
// import TasksCreate from "../pages/Tasks/tasks-create";

// //Projects
// import ProjectsGrid from "../pages/Projects/projects-grid";
// import ProjectsList from "../pages/Projects/projects-list";
// import ProjectsOverview from "../pages/Projects/projects-overview";
// import ProjectsCreate from "../pages/Projects/projects-create";

// //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts";
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProductDetail";
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders";
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers";
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
// import EcommerceShops from "../pages/Ecommerce/EcommerceShops";
// import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

// //Email
// import EmailInbox from "../pages/Email/email-inbox";
// import EmailRead from "../pages/Email/email-read";

// //Invoices
// import InvoicesList from "../pages/Invoices/invoices-list";
// import InvoiceDetail from "../pages/Invoices/invoices-detail";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ChangePassword from "../pages/Authentication/ChangePassord";

// // Inner Authentication
// import Login1 from "../pages/AuthenticationInner/Login";
// import Register1 from "../pages/AuthenticationInner/Register";
// import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";

// // Charts
// import ChartApex from "../pages/Charts/Apexcharts";
// import ChartistChart from "../pages/Charts/ChartistChart";
// import ChartjsChart from "../pages/Charts/ChartjsChart";
// import EChart from "../pages/Charts/EChart";
// import SparklineChart from "../pages/Charts/SparklineChart";
// import ToastUIChart from "../pages/Charts/ToastUIChart";

// // Maps
// import MapsGoogle from "../pages/Maps/MapsGoogle";
// import MapsVector from "../pages/Maps/MapsVector";

// //Icons
// import IconBoxicons from "../pages/Icons/IconBoxicons";
// import IconDripicons from "../pages/Icons/IconDripicons";
// import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
// import IconFontawesome from "../pages/Icons/IconFontawesome";

// //Tables
// import BasicTables from "../pages/Tables/BasicTables";
// import DatatableTables from "../pages/Tables/DatatableTables";
// import ResponsiveTables from "../pages/Tables/ResponsiveTables";
// import EditableTables from "../pages/Tables/EditableTables";

// // Forms
// import FormElements from "../pages/Forms/FormElements";
// import FormAdvanced from "../pages/Forms/FormAdvanced";
// import FormEditors from "../pages/Forms/FormEditors";
// import FormValidations from "../pages/Forms/FormValidations";
// import FormMask from "../pages/Forms/FormMask";
// import FormRepeater from "../pages/Forms/FormRepeater";
// import FormUpload from "../pages/Forms/FormUpload";
// import FormWizard from "../pages/Forms/FormWizard";
// import FormXeditable from "../pages/Forms/FormXeditable";

// //Ui
// import UiAlert from "../pages/Ui/UiAlert";
// import UiButtons from "../pages/Ui/UiButtons";
// import UiCards from "../pages/Ui/UiCards";
// import UiCarousel from "../pages/Ui/UiCarousel";
// import UiColors from "../pages/Ui/UiColors";
// import UiDropdown from "../pages/Ui/UiDropdown";
// import UiGeneral from "../pages/Ui/UiGeneral";
// import UiGrid from "../pages/Ui/UiGrid";
// import UiImages from "../pages/Ui/UiImages";
// import UiLightbox from "../pages/Ui/UiLightbox";
// import UiModal from "../pages/Ui/UiModal";
// import UiProgressbar from "../pages/Ui/UiProgressbar";
// import UiSweetAlert from "../pages/Ui/UiSweetAlert";
// import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
// import UiTypography from "../pages/Ui/UiTypography";
// import UiVideo from "../pages/Ui/UiVideo";
// import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
// import UiRating from "../pages/Ui/UiRating";
// import UiRangeSlider from "../pages/Ui/UiRangeSlider";

// //Pages
// import PagesStarter from "../pages/Utility/pages-starter";
// import PagesMaintenance from "../pages/Utility/pages-maintenance";
// import PagesComingsoon from "../pages/Utility/pages-comingsoon";
// import PagesTimeline from "../pages/Utility/pages-timeline";
// import PagesFaqs from "../pages/Utility/pages-faqs";
// import PagesPricing from "../pages/Utility/pages-pricing";
// import Pages404 from "../pages/Utility/pages-404";
// import Pages500 from "../pages/Utility/pages-500";

// //Contacts
// import ContactsGrid from "../pages/Contacts/contacts-grid";
// import ContactsList from "../pages/Contacts/contacts-list";
// import ContactsProfile from "../pages/Contacts/contacts-profile";

// Users
import CreateUser from "../pages/User/CreateUser";
import ListUser from "../pages/User/ListUser";

// Questions
import CreateQuestion from "../pages/Question/CreateQuestion";
import Profile from "../pages/User/Profile";
import ListQuestions from "../pages/Question/ListQuestions";
import ReviewQuestion from "../pages/Question/ReviewQuestion";
import Level from "../pages/Level";
import ViewQuestion from "../pages/Question/ViewQuestion";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // User
  { path: "/users/change-password", component: ChangePassword },
  { path: "/users/profile", component: Profile },
  { path: "/users/create", component: CreateUser },
  { path: "/users", component: ListUser },

  // Question
  { path: "/questions/:questionId/view", component: ViewQuestion },
  { path: "/questions/create", component: CreateQuestion },
  { path: "/questions/review", component: ReviewQuestion },
  { path: "/questions", component: ListQuestions },

  // Level 
  { path: "/levels", component: Level },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forget-password", component: ForgetPwd },
  // { path: "/register", component: Register },

  // { path: "/pages-maintenance", component: PagesMaintenance },
  // { path: "/pages-comingsoon", component: PagesComingsoon },
  // { path: "/pages-404", component: Pages404 },
  // { path: "/pages-500", component: Pages500 },

  // //Authentication Inner
  // { path: "/pages-login", component: Login1 },
  // { path: "/pages-register", component: Register1 },
  // { path: "/pages-forget-pwd", component: ForgetPwd1 }
];

export { authProtectedRoutes, publicRoutes };
