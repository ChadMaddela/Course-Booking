import Swal from 'sweetalert2';

function ArchiveCourse(courseId, updateCourses) {
    fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/archive`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Course archived successfully') {
            // Update the UI to reflect the changes
            updateCourses(courseId, { isActive: false });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Course archived successfully!',
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
        console.error('Error archiving course:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
        });
    });
}

export default ArchiveCourse;
