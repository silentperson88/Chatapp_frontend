/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import Author from "components/Table/Author";

export default function data(mobileUsers) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (mobileUsers) {
      const list = mobileUsers.map((item, index) => {
        const temp = {
          srNo: <Author name={index + 1} />,
          name: <Author name={`${item.firstName} ${item.lastName}`} />,
          email: <Author name={item.email} style={{ textTransform: "normal" }} />,
          role: <Author name={item.role} />,
        };
        return temp;
      });
      setRows([...list]);
    }
  }, [mobileUsers]);

  return {
    columns: [
      { Header: "No.", accessor: "srNo", width: "3%" },
      // headers for name, email, phone, zipcode, loan amount, employment type, income, pancard number, date of birth, gender, status, action
      { Header: "Name", accessor: "name", width: "10%" },
      { Header: "Email", accessor: "email", width: "10%" },
      { Header: "Role", accessor: "role", width: "10%" },
    ],
    rows,
  };
}
