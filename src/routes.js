/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `page` value is used for a page routing. 
  4. The `type` key with the `divider` value is used for a divider between Sidenav items.
  5. The `name` key is used for the name of the route on the Sidenav.
  6. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  7. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  8. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  9. The `route` key is used to store the route location which is used for the react router.
  10. The `href` key is used to store the external links location.
  11. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  12. The `component` key is used to store the component of its route.
*/

// Admin layouts
import SignIn from "layouts/authentication/sign-in";
import UserManagement from "layouts/userManagement";
import GroupManagement from "layouts/groupManagement/Groups";
import Group from "layouts/group/Groups";

// Super Admin Layouts

// @mui icons
import Icon from "@mui/material/Icon";

export const appRoutes = [
  {
    type: "page",
    name: "Sign In",
    key: "sign-in",
    accessibleTo: "all",
    icon: <Icon fontSize="small">SignIn</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Users Management",
    key: "Group",
    accessibleTo: "admin",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/users-management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Gorups Management",
    key: "Group",
    accessibleTo: "all",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    route: "/groups-management",
    component: <GroupManagement />,
  },
  {
    type: "page",
    name: "Member",
    key: "group",
    accessibleTo: "all",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/group/:id",
    component: <Group />,
  },
];

export default appRoutes;
