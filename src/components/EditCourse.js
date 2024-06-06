import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EditCourse({ course, onSave, onClose }) {
    const [editedCourse, setEditedCourse] = useState({ ...course });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse({ ...editedCourse, [name]: value });
    };

    const handleSubmit = () => {

        fetch(`${process.env.REACT_APP_API_URL}/courses/${editedCourse._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: editedCourse.name,
                description: editedCourse.description,
                price: editedCourse.price
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Course updated successfully') {
                    Swal.fire({
                        title: "Course updated successfully",
                        icon: 'success',
                        text: "Course updated successfully"
                    });
                    // Call onSave after successful update
                    onSave(editedCourse);
                } else if (data.error === 'Course not found') {
                    Swal.fire({
                        title: "Course not found",
                        icon: 'error',
                        text: "Course not found."
                    });
                }
            })
            .catch(error => console.error('Error updating course:', error));
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={editedCourse.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={editedCourse.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={editedCourse.price} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCourse;
