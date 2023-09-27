import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// Custom Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PageTitle from "examples/NewDesign/PageTitle";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "examples/NewDesign/CustomButton";
import MemberData from "layouts/group/data/Member";
import AddMember from "examples/modal/GroupMember";
import ViewMember from "examples/modal/ViewMember";
import DeleteModal from "examples/modal/deleteModal/deleteModal";

// Constant
import Constants, { Colors } from "utils/Constants";

// Redux component
import { useDispatch, useSelector } from "react-redux";
import { getAllMemberOfGroups, removeMemberFromGroup } from "redux/Thunks/Member";
import { openSnackbar } from "redux/Slice/Notification";
import { useParams } from "react-router-dom";
import { getMessageOfGroup } from "redux/Thunks/Group";
import ChatScreen from "./Chat";

function ManageGroups() {
  const [openAddMemeber, setOpenAddMember] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMemeberId, setSelectedMEmeberId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleAddMemberOpen = async () => setOpenAddMember(true);
  const handleAddMemeberClose = () => setOpenAddMember(false);
  const handleViewOpen = async () => setOpenView(true);
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const handleViewClose = () => setOpenView(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group);

  const handleRemoveMember = async (ids) => setSelectedMEmeberId(ids);

  const { columns, rows } = MemberData(members, handleRemoveMember);

  useEffect(() => {
    (async () => {
      if (!openAddMemeber) {
        const res = await dispatch(getAllMemberOfGroups(id));
        if (res.payload.status === 200) {
          setMembers(res.payload.data.data);
        } else {
          dispatch(
            openSnackbar({
              message: Constants.MEMBER_FETCH_SUCCESS,
              notificationType: Constants.NOTIFICATION_ERROR,
            })
          );
        }
      }
    })();
  }, [refresh, id, openAddMemeber]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getMessageOfGroup(id));
      if (res.payload.status === 200) {
        const tempGroupMessages = res.payload.data.data.chats.map((message) => ({
          text: message.message,
          likedCount: message.like,
          id: message[Constants.MONGOOSE_ID],
          isSent: message.sender === res.payload.data.data.requestedId,
          chatId: message[Constants.MONGOOSE_ID],
        }));
        setMessages(tempGroupMessages);
      } else {
        dispatch(
          openSnackbar({
            message: Constants.MEMBER_FETCH_SUCCESS,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
    })();
  }, [newMessage !== "", id]);

  const handleRemove = async () => {
    const res = await dispatch(removeMemberFromGroup({ groupId: id, memberId: selectedMemeberId }));
    if (res.payload.status === 200) {
      dispatch(
        openSnackbar({
          message: Constants.MEMBER_REMOVE_SUCCESS,
          notificationType: Constants.NOTIFICATION_SUCCESS,
        })
      );
      setRefresh(!refresh);
      setSelectedMEmeberId(null);
    } else {
      dispatch(
        openSnackbar({
          message: Constants.MEMBER_REMOVE_ERROR,
          notificationType: Constants.NOTIFICATION_ERROR,
        })
      );
    }
  };

  return (
    <DashboardLayout xPadding={0}>
      {openAddMemeber && <AddMember open={openAddMemeber} handleClose={handleAddMemeberClose} />}
      {openView && (
        <ViewMember title="Geoup Members" open={openView} handleClose={handleViewClose}>
          <DataTable
            table={{
              columns,
              rows,
            }}
            backgroundColor={Colors.LIGHT_GRAY} // Specify the background color here
            textColor={Colors.BLACK}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            pagination={{ variant: "gradient", color: "info" }}
            loading="fullfilled"
          />
        </ViewMember>
      )}
      <MDBox px={3} display="flex" flexDirection="column">
        <DashboardNavbar />
        <MDBox display="flex" justifyContent="space-between">
          <PageTitle
            title={groups.groupList.find((group) => group[Constants.MONGOOSE_ID] === id)?.name}
          />
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <CustomButton
              title="Member"
              icon="add_circle_outline"
              background="#191A51"
              color="#ffffff"
              openModal={handleAddMemberOpen}
            />
            <CustomButton
              title="View"
              icon="calendar_view_day"
              background="#191A51"
              color="#ffffff"
              openModal={handleViewOpen}
            />
          </MDBox>
        </MDBox>
      </MDBox>
      <ChatScreen
        messages={messages}
        setMessages={setMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
      <DeleteModal
        open={selectedMemeberId !== null}
        title="Remove Member"
        message="Are you sure you want to member?"
        handleClose={() => setSelectedMEmeberId(null)}
        handleDelete={handleRemove}
      />
    </DashboardLayout>
  );
}

export default ManageGroups;
