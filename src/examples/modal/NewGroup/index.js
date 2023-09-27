/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { Grid, Icon, Modal, TextField } from "@mui/material";
import style from "assets/style/Modal";
import pxToRem from "assets/theme/functions/pxToRem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { useState } from "react";
import ModalTitle from "examples/NewDesign/ModalTitle";
import Validations from "utils/Validations/index";
import Constants, { Icons } from "utils/Constants";
import { useDispatch } from "react-redux";
import { openSnackbar } from "redux/Slice/Notification";
import getAllGroupsOfMember, { createGroups } from "redux/Thunks/Member";

function index({ open, handleClose }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const disptach = useDispatch();

  const validate = () => {
    const nameValidation = Validations.validate("basic", values.name, 3, 30, true);
    const descriptionValidation = Validations.validate("basic", values.description, 3, 30, true);

    const newErrors = {};

    if (nameValidation !== "") {
      newErrors.name = nameValidation;
    }
    if (descriptionValidation !== "") {
      newErrors.description = descriptionValidation;
    }

    setErrors(newErrors);
    return Object.values(newErrors).filter((val) => val !== "").length === 0;
  };
  const handleResetModal = () => {
    setErrors({});
    handleClose();
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const val = validate();
    if (val) {
      setIsSubmitting(true);
      const newData = {
        ...values,
        id: Math.floor(Math.random() * 1000000000),
      };
      const res = await disptach(createGroups(newData));
      if (res.payload.status === 200) {
        handleResetModal();
        await disptach(getAllGroupsOfMember());

        disptach(
          openSnackbar({
            message: Constants.GROUP_CREATE_SUCCESS,
            notificationType: Constants.NOTIFICATION_SUCCESS,
          })
        );
      } else {
        setErrors({ name: res.payload.data.message });
        disptach(
          openSnackbar({
            message: Constants.GROUP_CREATE_FAILURE,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <MDBox>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox
            bgColor="info"
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="lg"
            sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, height: pxToRem(72) }}
          >
            <ModalTitle title="New Group" color="white" />
            <Icon
              sx={{ cursor: "pointer", color: "beige" }}
              fontSize="medium"
              onClick={handleResetModal}
            >
              {Icons.CROSS}
            </Icon>
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            px={3}
            py={2}
            sx={{
              maxHeight: 500,
              overflowY: "scroll",
              "::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <TextField
              sx={{ marginBottom: 2 }}
              name="name"
              label="Name*"
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="description"
              label="Description*"
              value={values.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
          </MDBox>

          <MDBox px={0} mb={2} ml={2}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid item xs={2}>
                <MDButton
                  variant="contained"
                  color={isSubmitting ? "secondary" : "info"}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  style={{ textTransform: "none", boxShadow: "none" }}
                >
                  {loading ? "Loading..." : "Submit"}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

export default index;
