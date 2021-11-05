import * as React from 'react';

import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

function EmployeeForm(props) {
  const {
    employeeData,
    errorData,
    handleFormInput,
    handleAddressFormInput,
    addEmployeeAddress,
    deleteEmployeeAddress,
  } = props;

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h6">Add User</Typography>
      {errorData.length > 0 ? (
        <Typography variant="h6" sx={{ color: '#cf2323' }}>
          {errorData}
        </Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextField
          name="firstName"
          value={employeeData.firstName}
          variant="outlined"
          placeholder="first name"
          type="text"
          onChange={(e) => handleFormInput(e)}
        />
        <TextField
          name="lastName"
          value={employeeData.lastName}
          variant="outlined"
          placeholder="last name"
          type="text"
          onChange={(e) => handleFormInput(e)}
        />
        <TextField
          name="email"
          value={employeeData.email}
          variant="outlined"
          placeholder="email"
          type="email"
          onChange={(e) => handleFormInput(e)}
        />
        <TextField
          name="phoneNumber"
          value={employeeData.phoneNumber}
          variant="outlined"
          placeholder="phone number"
          type="text"
          onChange={(e) => handleFormInput(e)}
        />
        <Button
          style={{ marginLeft: '5px' }}
          onClick={addEmployeeAddress}
          variant="contained"
        >
          Additional Address
        </Button>
      </Box>
      {employeeData.addresses.map((address, index) => {
        return (
          <Box
            key={`address${index}`}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextField
              name="streetName"
              value={address.streetName}
              variant="outlined"
              placeholder="street address"
              type="text"
              onChange={(e) => handleAddressFormInput(e, index)}
            />
            <TextField
              name="postalCode"
              value={address.postalCode}
              variant="outlined"
              placeholder="postal code"
              type="text"
              onChange={(e) => handleAddressFormInput(e, index)}
            />
            <TextField
              name="appartmentNumber"
              value={address.appartmentNumber}
              variant="outlined"
              placeholder="appartment number"
              type="number"
              onChange={(e) => handleAddressFormInput(e, index)}
            />
            <TextField
              name="state"
              value={address.state}
              variant="outlined"
              placeholder="state"
              type="text"
              onChange={(e) => handleAddressFormInput(e, index)}
            />
            <TextField
              name="country"
              value={address.country}
              variant="outlined"
              placeholder="country"
              type="text"
              onChange={(e) => handleAddressFormInput(e, index)}
            />
            {employeeData.addresses.length > 1 ? (
              <IconButton
                aria-label="delete"
                onClick={() => deleteEmployeeAddress(index)}
                sx={{ color: '#cf2323' }}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
          </Box>
        );
      })}
    </Container>
  );
}

export default EmployeeForm;
