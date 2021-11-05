import * as React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { Container } from '@mui/material';

import './App.css';
import EmployeeList from './widgets/EmployeeList';
import EmployeeForm from './widgets/EmployeeForm';
import CustomButton from './widgets/CustomButton';

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [errorData, setErrorData] = useState('');
  const [updateExistingUser, setUpdateExistingUser] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addresses: [
      {
        streetName: '',
        postalCode: '',
        appartmentNumber: '',
        state: '',
        country: '',
      },
    ],
  });

  useEffect(async () => {
    const res = await axios.get(
      'https://procom-interview-employee-test.azurewebsites.net/Employee'
    );

    setEmployeeList(res.data);
  }, []);

  function handleFormInput(e) {
    if (errorData.length) {
      setErrorData('');
    }

    const { name, value } = e.target;

    setEmployeeData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleAddressFormInput(e, index) {
    if (errorData.length) {
      setErrorData('');
    }

    const { name, value } = e.target;

    const newAddressData = {
      ...employeeData.addresses[index],
      [name]: value,
    };

    const addressArray = employeeData.addresses;
    addressArray[index] = newAddressData;

    setEmployeeData((prev) => {
      return { ...prev, addresses: addressArray };
    });
  }

  function addEmployeeAddress() {
    const newAddress = {
      streetName: '',
      postalCode: '',
      appartmentNumber: '',
      state: '',
      country: '',
    };

    const addressArray = employeeData.addresses;
    addressArray.push(newAddress);

    setEmployeeData((prev) => {
      return { ...prev, addresses: addressArray };
    });
  }

  function deleteEmployeeAddress(index) {
    if (employeeData.addresses.length > 1) {
      const addressArray = employeeData.addresses;
      addressArray.splice(index, 1);

      setEmployeeData((prev) => {
        return { ...prev, addresses: addressArray };
      });
    }
  }

  async function editEmployeeData(id) {
    const res = await axios.get(
      `https://procom-interview-employee-test.azurewebsites.net/Employee/${id}`
    );

    setEmployeeData(res.data);
    setUpdateExistingUser(true);
  }

  async function handleSubmit() {
    for (const key in employeeData) {
      if (!employeeData[key] && key != 'id') {
        setErrorData('Please fill out all empolyee information');
        return;
      }
    }

    employeeData.addresses.forEach((address) => {
      for (const key in address) {
        if (!address[key] && key != 'appartmentNumber') {
          setErrorData('Please fill out all address information');
          return;
        }
      }
    });

    try {
      await axios.post(
        'https://procom-interview-employee-test.azurewebsites.net/Employee',
        employeeData
      );

      const res = await axios.get(
        'https://procom-interview-employee-test.azurewebsites.net/Employee'
      );

      setEmployeeList(res.data);
      setErrorData('');
      setEmployeeData({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        addresses: [
          {
            streetName: '',
            postalCode: '',
            appartmentNumber: '',
            state: '',
            country: '',
          },
        ],
      });
    } catch (e) {
      setErrorData('Unable to add new user.');
    }
  }

  async function handleUpdate(employeeId) {
    if (!employeeId) {
      return;
    }

    for (const key in employeeData) {
      if (!employeeData[key] && key != 'id') {
        setErrorData('Please fill out all empolyee information');
        return;
      }
    }

    try {
      await axios.put(
        `https://procom-interview-employee-test.azurewebsites.net/Employee/${employeeId}`,
        employeeData
      );

      const res = await axios.get(
        'https://procom-interview-employee-test.azurewebsites.net/Employee'
      );

      setEmployeeList(res.data);
      setErrorData('');
      setUpdateExistingUser(false);
      setEmployeeData({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        addresses: [
          {
            streetName: '',
            postalCode: '',
            appartmentNumber: '',
            state: '',
            country: '',
          },
        ],
      });
    } catch (err) {
      setErrorData('Unable to update user.');
    }
  }

  async function removeEmployeeData(employeeId) {
    if (!employeeId) {
      return;
    }

    try {
      await axios.delete(
        `https://procom-interview-employee-test.azurewebsites.net/Employee/${employeeId}`
      );

      const res = await axios.get(
        'https://procom-interview-employee-test.azurewebsites.net/Employee'
      );

      setEmployeeList(res.data);
    } catch (err) {
      setErrorData('Unable to delete user.');
    }
  }

  return (
    <Container sx={{ mt: 5 }}>
      <EmployeeList
        data={employeeList}
        removeHandler={removeEmployeeData}
        editHandler={editEmployeeData}
      />

      <EmployeeForm
        employeeData={employeeData}
        errorData={errorData}
        handleFormInput={handleFormInput}
        handleAddressFormInput={handleAddressFormInput}
        addEmployeeAddress={addEmployeeAddress}
        deleteEmployeeAddress={deleteEmployeeAddress}
      />
      <CustomButton
        updateExistingUser={updateExistingUser}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        employeeData={employeeData}
      />
    </Container>
  );
}

export default App;
