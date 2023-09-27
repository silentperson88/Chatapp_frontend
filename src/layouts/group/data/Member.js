/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";

import Author from "components/Table/Author";
import MDBox from "components/MDBox";
import { IconButton } from "@mui/material";
import Constants, { Icons } from "utils/Constants";

export default function data(groupList, handleRemoveMember) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (groupList) {
      const list = groupList.map((item, index) => {
        const temp = {
          srNo: <Author name={index + 1} />,
          name: <Author name={`${item.userId?.firstName} ${item.userId.lastName}`} />,
          isAdmin: <Author name={item.isAdmin ? "Yes" : "No"} />,
          action: (
            <MDBox>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleRemoveMember(item.userId[Constants.MONGOOSE_ID])}
              >
                {Icons.DELETE}
              </IconButton>
            </MDBox>
          ),
        };
        return temp;
      });
      setRows([...list]);
    }
  }, [groupList]);

  return {
    columns: [
      { Header: "No.", accessor: "srNo", width: "3%" },
      { Header: "Name", accessor: "name", width: "10%" },
      { Header: "IsAdmin", accessor: "isAdmin", width: "10%" },
      { Header: "Action", accessor: "action", width: "10%" },
    ],
    rows,
  };
}
