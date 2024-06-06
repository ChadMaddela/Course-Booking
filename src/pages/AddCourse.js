import { useState, useEffect, useContext} from 'react';
import { Form, Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddCourse() {

		const { user } = useContext(UserContext);

		const [name,setCourseName] = useState("");
		const [description,setCourseDescription] = useState("");
		const [price,setPrice] = useState("");
		const [isActive,setIsActive] = useState(false);
		const navigate = useNavigate();

			console.log(name);
            console.log(description);
            console.log(price);
            console.log(user.isAdmin);


        function createCourse(e) {

        	e.preventDefault();

        	fetch(`${ process.env.REACT_APP_API_URL }/courses/`, {

        		method: 'POST',
        		headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            	},
        		body: JSON.stringify({

        			name: name, 
        			description: description,
        			price: price,

        		})
        	})
        	.then(res => res.json())
        	.then(data => {
        		
        	if(data.savedCourse){

        		console.log(data.savedCourse);
        		setCourseName('');
        		setCourseDescription('');
        		setPrice('');
        		
                Swal.fire({
                    title: "Course Added",
                    icon: "success",
                    // text: "You may add another course"
                })
                navigate("/courses");

        	} else if (data.error === "Course already exists"){
        		Swal.fire({
                    title: "Course already exists",
                    icon: "error",
                    text: "Please add a different course"
                })

        	} else if (data.error === "Failed to save the course"){
        		Swal.fire({
                    title: "Failed to save the course",
                    icon: "error",
                    text: "Error while saving the course"
                })

        	} else if (data.auth === "Failed"){
        		Swal.fire({
                    title: "Access Denied",
                    icon: "error",
                    text: "Only Admin can add a course"
                })
                navigate("/courses");
            } else {
        		Swal.fire({
                    title: "Unsuccessful Course Creation",
                    icon: "error",
                    // text: "Only Admin can add a course"
                })
        	}
        	})
        }

        useEffect(()=>{

        	if(!user.isAdmin){
        	navigate("/courses");
        	}

        	if(name !== "" && description !== "" && price !== "" ){

        		setIsActive(true)
        	} else {
        		setIsActive(false)
        	}
        }, [name, description, price])

	return(
			
			<Form onSubmit={(e) => createCourse(e)}>
			<h1 className="my-5 text-center">Add Course</h1>

			<Form.Group className="mb-3">
			  <Form.Label>Course Name:</Form.Label>
			  <Form.Control 
			  type="text" 
			  placeholder="Enter Course Name" 
			  required
			  value={name}
			  onChange={e => {setCourseName(e.target.value)}}
			  />
			</Form.Group>

			<Form.Group className="mb-3">
			  <Form.Label>Description</Form.Label>
			  <Form.Control 
			  type="text" 
			  placeholder="Enter Description" 
			  required
			  value={description}
			  onChange={e => {setCourseDescription(e.target.value)}}
			  />
			</Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Price:</Form.Label>
		        <Form.Control 
		        type="number" 
		        placeholder="Enter price" 
		        required
		        value={price}
			  	onChange={e => {setPrice(e.target.value)}}
		        />
		      </Form.Group>

		     { isActive ?
		      <Button variant="primary" type="submit" id="submitBtn">
		        Submit
		      </Button>
		      :
		      <Button variant="danger" type="submit" id="submitBtn" disabled>
		        Submit
		      </Button>
		     }
		    </Form>
	)
}