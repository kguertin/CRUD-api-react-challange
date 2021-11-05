import { Container, Box, Button } from '@mui/material';

function CustomButton(props) {
  const { updateExistingUser, handleSubmit, handleUpdate, employeeData } =
    props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
      }}
    >
      {updateExistingUser ? (
        <Button
          onClick={() => handleUpdate(employeeData.id ? employeeData.id : null)}
          variant="contained"
        >
          Update Employee
        </Button>
      ) : (
        <Button onClick={handleSubmit} variant="contained">
          Add Employee
        </Button>
      )}
    </Box>
  );
}

export default CustomButton;
