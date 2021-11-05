import * as React from 'react';

import { Typography, Grid, IconButton, Card, CardContent } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function EmployeeList(props) {
  const { data, removeHandler, editHandler } = props;
  return (
    <Grid container spacing={2}>
      {data.map((employee) => {
        return (
          <Grid item key={employee.id}>
            <Card sx={{ minWidth: 200, maxHeight: 300, background: '#ddd' }}>
              <CardContent>
                <Typography variant="body1">{employee.firstName}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body1">{employee.lastName}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body2">{employee.email}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body2">{employee.phoneNumber}</Typography>
              </CardContent>
              <CardContent>
                <IconButton onClick={() => removeHandler(employee.id)}>
                  <DeleteIcon
                    sx={{
                      color: '#cf2323',
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => editHandler(employee.id)}>
                  <EditIcon
                    sx={{
                      color: '#00703c',
                    }}
                  />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default EmployeeList;
