/* eslint-disable */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// Custom Components
import NewUser from "examples/modal/NewUser";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PageTitle from "examples/NewDesign/PageTitle";
import UserList from "layouts/userManagement/data/userList";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "examples/NewDesign/CustomButton";

// Constant
import Constants, { defaultData, PageTitles } from "utils/Constants";

// Redux component
import { openSnackbar } from "redux/Slice/Notification";
import { useDispatch } from "react-redux";
import Sessions from "utils/Sessions";
import { useNavigate } from "react-router-dom";
import getAllUsers from "redux/Thunks/UserManagement";

function feedbacks() {
  const [open, setOpen] = useState(false);
  const [mobileUsers, setMobileUsers] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = async () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { columns, rows } = UserList(mobileUsers);

  useEffect(() => {
    (async () => {
      if (!open) {
        const res = await dispatch(getAllUsers());
        if (res.payload.status === 200) {
          setMobileUsers(res.payload.data.data);
        } else {
          dispatch(
            openSnackbar({
              message: Constants.MOBILE_USERS_ERROR,
              notificationType: Constants.NOTIFICATION_ERROR,
            })
          );
        }
      }
    })();
  }, [open]);

  const handleLogout = async () => {
    Sessions.setClear();
    navigate("/authentication/sign-in", { replace: true });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {open && <NewUser open={open} handleClose={handleClose} />}
      <MDBox py={2} display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={PageTitles.MANAGE_USERS} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <CustomButton
            title="User"
            icon="add_circle_outline"
            background="#191A51"
            color="#ffffff"
            openModal={handleOpen}
          />
          <CustomButton
            title="Logout"
            icon="power_settings_new"
            background="#191A51"
            color="#ffffff"
            openModal={handleLogout}
          />
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={{ defaultValue: defaultData.PER_PAGE }}
          showTotalEntries={false}
          noEndBorder
          loading="fullfilled"
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default feedbacks;
