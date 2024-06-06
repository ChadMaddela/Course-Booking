import Swal from 'sweetalert2';

function ActivateCourse(courseId, updateCourses) {
    fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/activate`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Course activated successfully') {
            // Update the UI to reflect the changes
            updateCourses(courseId, { isActive: true });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Course activated successfully!',
            });
        } else if (data.error === 'Course not found') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Course not found.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
            });
        }
    })
    .catch(error => {
        console.error('Error activating course:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
        });
    });
}

export default ActivateCourse;
