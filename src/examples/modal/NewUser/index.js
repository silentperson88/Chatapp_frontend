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
import { CreateNewUser } from "redux/Thunks/UserManagement";

function index({ open, handleClose }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const disptach = useDispatch();

  const validate = () => {
    const firstNameValidate = Validations.validate("basic", values.firstName, 3, 30, true);
    const lastNameValidate = Validations.validate("basic", values.lastName, 3, 30, true);
    const emailValidate = Validations.validate("email", values.email, 3, 30, true);
    const passwordValidate = Validations.validate("password", values.password, 3, 30, true);
    const confirmPasswordValidate = Validations.validate(
      "password",
      values.confirmPassword,
      3,
      30,
      true
    );

    const newErrors = {};

    if (firstNameValidate !== "") {
      newErrors.firstName = firstNameValidate;
    }
    if (lastNameValidate !== "") {
      newErrors.lastName = lastNameValidate;
    }
    if (emailValidate !== "") {
      newErrors.email = emailValidate;
    }
    if (passwordValidate !== "") {
      newErrors.password = passwordValidate;
    }
    if (confirmPasswordValidate !== "") {
      newErrors.confirmPassword = confirmPasswordValidate;
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
      const res = await disptach(CreateNewUser(newData));
      if (res.payload.status === 200) {
        handleResetModal();

        disptach(
          openSnackbar({
            message: Constants.USER_CREATE_SUCCESS,
            notificationType: Constants.NOTIFICATION_SUCCESS,
          })
        );
      } else {
        disptach(
          openSnackbar({
            message: Constants.USER_CREATE_FAILURE,
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
            <ModalTitle title="New User" color="white" />
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
              name="firstName"
              label="First Name*"
              value={values.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="lastName"
              label="Last Name*"
              value={values.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />

            <TextField
              sx={{ marginBottom: 2 }}
              name="email"
              label="Email*"
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />

            <TextField
              sx={{ marginBottom: 2 }}
              name="password"
              label="Password*"
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="confirmPassword"
              label="Confirm Password*"
              value={values.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
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
