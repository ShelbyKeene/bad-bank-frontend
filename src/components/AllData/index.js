import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Alldata = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:3000/account/all")
      .then((response) => response.json())
      .then((data) => {
        // Set the received data in the state
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

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
            
            <tr key={user.id}> {/* Use user.id as the unique key */}
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
