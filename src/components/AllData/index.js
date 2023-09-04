import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";

const Alldata = ({token}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:3000/account/all", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the received data in the state
        console.log(data); // Add this line to see the data
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, [token]);;; // Empty dependency array means this effect runs once when the component mounts

  // // Deletes a user by ID
  // const handleDeleteUser = (userId) => {
  //   // Filter the users array to exclude the user with the provided ID
  //   const updatedUsers = users.filter((user) => user.id !== userId);
  //   // Update the users state with the updated array
  //   setUsers(updatedUsers);
  // };

  return (
    <div className="main-Alldata-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
              <td>
                {/* <Button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Alldata;
