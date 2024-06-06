import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditCourse from '../components/EditCourse';
import Swal from 'sweetalert2';
import ActivateCourse from './ActivateCourse';
import ArchiveCourse from './ArchiveCourse';
import CourseSearch from './CourseSearch';

function AdminView({ coursesData }) {
    const [courses, setCourses] = useState(coursesData);
    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const [editCourse, setEditCourse] = useState(null);

useEffect(() => {
    setFilteredCourses(coursesData);
}, [coursesData]);

const handleSearchByName = (searchTerm) => {
    if (searchTerm.trim() === '') {
        setFilteredCourses(coursesData);
    } else {
        setFilteredCourses(
            coursesData.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
};

const handleSearchByPrice = (minPrice, maxPrice) => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER;

    setFilteredCourses(
        coursesData.filter(course => course.price >= min && course.price <= max)
    );
};

const updateCourses = (courseId, updatedFields) => {
    const updatedCourses = courses.map(course => {
        if (course._id === courseId) {
            return { ...course, ...updatedFields };
        }
        return course;
    });
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
};

const handleEdit = (course) => {
    setEditCourse(course);
};

const handleSave = (editedCourse) => {
    const updatedCourses = courses.map(course => {
        if (course._id === editedCourse._id) {
            return editedCourse;
        }
        return course;
    });
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);

    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Changes saved successfully!',
    });
};

const handleArchive = (courseId) => {
    ArchiveCourse(courseId, updateCourses);
};

const handleActivate = (courseId) => {
    ActivateCourse(courseId, updateCourses);
};

return (
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>
        <CourseSearch onSearchByName={handleSearchByName} onSearchByPrice={handleSearchByPrice} />
        <table className="table table-striped table-bordered table-hover table-responsive">
            <thead className="text-center">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th colSpan="3">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredCourses.map(course => (
                    <tr key={course._id}>
                        <td>{course._id}</td>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>{course.price}</td>
                        <td>
                            {course.isActive ? (
                                <span className="text-success">Available</span>
                            ) : (
                                <span className="text-danger">Unavailable</span>
                            )}
                        </td>
                        <td>
                            <Button className="btn btn-primary" onClick={() => handleEdit(course)}>Edit</Button>
                        </td>
                        <td>
                            {course.isActive ? (
                                <Button className="btn btn-danger" onClick={() => handleArchive(course._id)}>   Archive</Button>
                            ) : (
                                <Button className="btn btn-success" onClick={() => handleActivate(course._id)}>Activate</Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {editCourse && <EditCourse course={editCourse} onSave={handleSave} onClose={() => setEditCourse(null)} />}
    </div>
);
}

export default AdminView;
