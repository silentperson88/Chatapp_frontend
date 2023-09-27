/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";

import Author from "components/Table/Author";

export default function data(groupList) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (groupList) {
      const list = groupList.map((item, index) => {
        const temp = {
          srNo: <Author name={index + 1} />,
          groupName: <Author name={item?.name} />,
          description: <Author name={item?.description} />,
        };
        return temp;
      });
      setRows([...list]);
    }
  }, [groupList]);

  return {
    columns: [
      { Header: "No.", accessor: "srNo", width: "3%" },
      { Header: "Group", accessor: "groupName", width: "10%" },
      { Header: "Description", accessor: "description", width: "10%" },
    ],
    rows,
  };
}
