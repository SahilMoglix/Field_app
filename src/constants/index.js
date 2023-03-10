import CalendarScreen from "../containers/Calendar";
import MyVisitScreen from "../containers/MyVisit";
import ContactScreen from "../containers/Contact";
import ActivityScreen from "../containers/Activity";
import LoginScreen from "../containers/Login";
import PlantVisitScreen from "../containers/PlantVisit";
import AddContactScreen from "../containers/AddContact";
import Splash from "../containers/Login/splash";


export const BOTTOM_TAB_SCREENS = [
  {
    name: "Calender",
    component: CalendarScreen,
    inactiveIcon: "Date_icon",
    activeIcon: "Recent_blue",
  },
  // {
  //   name: "My Visit",
  //   component: MyVisitScreen,
  //   activeIcon: "Notes_grey",
  //   inactiveIcon: "Notes_Blue",
  // },
  {
    name: "Contact",
    component: ContactScreen,
    inactiveIcon: "Contact_grey",
    activeIcon: "Contact_Blue",
  },
  {
    name: "Communication",
    component: ActivityScreen,
    inactiveIcon: "Alerts_grey",
    activeIcon: "Alerts_blue",
  },
];

// export const AUTH_STACK_SCREENS = [
//   {
//     name: "Login",
//     component: LoginScreen,
//   },
// ];

export const APP_STACK_SCREENS = [
  {
    name: "PlantVisit",
    component: PlantVisitScreen,
  },
  {
    name: "AddContact",
    component: AddContactScreen,
  },
  {
    name: "Splash",
    component: Splash,
  },
  {
    name: "Login",
    component: LoginScreen
  },
];
