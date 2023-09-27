import React, { useState } from "react";
import MDBox from "components/MDBox";

// Custom Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PageTitle from "examples/NewDesign/PageTitle";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "examples/NewDesign/CustomButton";
import UserData from "layouts/group/data/UserData";
import NewGroup from "examples/modal/NewGroup";

// Constant
import { defaultData, PageTitles } from "utils/Constants";

// Redux component
import { useSelector } from "react-redux";

function ManageGroups() {
  const [open, setOpen] = useState(false);
  const groups = useSelector((state) => state.group);

  const handleOpen = async () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { columns, rows } = UserData(groups?.groupList);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {open && <NewGroup open={open} handleClose={handleClose} />}
      <MDBox display="flex" justifyContent="space-between">
        <PageTitle title={PageTitles.GROUP_MANAGEMENT} />
        <CustomButton
          title="Group"
          icon="add_circle_outline"
          background="#191A51"
          color="#ffffff"
          openModal={handleOpen}
        />
      </MDBox>
      <MDBox mt={2}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={{ defaultValue: defaultData.PER_PAGE }}
          showTotalEntries={false}
          noEndBorder
          loading={groups?.loading}
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageGroups;
