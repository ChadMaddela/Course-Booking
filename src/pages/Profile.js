import { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user._id) {
          setDetails(data.user);
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.error || "Something went wrong, kindly contact us for assistance.",
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUser(data.user);
      Swal.fire({
        title: "Profile Updated",
        icon: "success",
        text: "Your profile has been updated successfully.",
      });
      setEditable(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error.message || "Something went wrong, kindly contact us for assistance.",
      });
    }
  };
return user.id === null ? (
    <Navigate to="/courses" />
  ) : (
    <>
      <Row>
        <Col className="p-5 bg-primary text-white">
          <h1 className="my-5">Profile</h1>
          <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
          <hr />
          <h4>Contacts</h4>
          <ul>
            <li>Email: {details.email}</li>
            <li>Mobile No: {details.mobileNo}</li>
          </ul>
          <Button variant="secondary" onClick={() => setEditable(!editable)}>
            {editable ? "Cancel" : "Update Profile"}
          </Button>
        </Col>
      </Row>

      {editable && (
        <Row className="mt-4">
          <Col>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={details.firstName || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={details.lastName || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formMobileNo">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNo"
                  value={details.mobileNo || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Col>
        </Row>
      )}

      <Row className="pt-4 mt-4">
        <Col>
          <ResetPassword />
        </Col>
      </Row>
    </>
  );
}