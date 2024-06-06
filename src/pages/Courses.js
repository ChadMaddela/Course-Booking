// import coursesData from '../data/coursesData';
import { useEffect, useState, useContext } from 'react';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import Swal from 'sweetalert2';


export default function Courses() {

        // console.log(coursesData);
        // console.log(coursesData[0]);

        // The "map" method loops through the individual course objects in our array and returns a component for each course
        // Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
        // Everytime the map method loops through the data, it creates a "CourseCard" component and then passes the current element in our coursesData array using the courseProp

        // const courses = coursesData.map(course => {
        //  return (
        //          <CourseCard key = {course.id} courseProp={course} />
        //      )
        // });

        const { user } = useContext(UserContext);

        const [courses, setCourses] = useState([]);

        // const retrieveUserDetails = (token) => {
        //     fetch('http://localhost:4000/users/details',{
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);

        //         setUser({
        //             id: data.user._id,
        //             isAdmin: data.user.isAdmin
        //         });
        //     });
        // }
        
    useEffect(() => {

            if(!user.isAdmin){
                fetch(`${process.env.REACT_APP_API_URL}/courses`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    console.log(user.isAdmin);
                    setCourses(data.courses);
                });
            }
            if(user.isAdmin){
                fetch(`${process.env.REACT_APP_API_URL}/courses/all`,{
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ localStorage.getItem('token') }`
                    }
                    
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    console.log(user.isAdmin);
                    if (data.courses) {

                    setCourses(data.courses);

                    } else if (data.message === 'No courses found.') {

                        Swal.fire({
                            title: "No Courses Found",
                            icon: 'error',
                            text: "No Courses"
                        });


                    } else {

                        Swal.fire({
                            title: "Something went wrong",
                            icon: "error",
                            text: "Please try again."
                        });
                    }                
                });
                }
            }, []);
    


    return (
        <>
            {user.isAdmin ? (
                <AdminView coursesData={courses} />
            ) : (
                <UserView coursesData={courses} />
            )}
        </>
        )
}