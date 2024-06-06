import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function CourseCard({courseProp}) {

        // console.log(props);
        // console.log(typeof props)

        const {_id, name, description, price} = courseProp;
        // Use the state hook for this component to be able to store its state
        // States are used to keep track of information related to individual components
        // Syntax
            // const [getter, setter] = useState(initialGetterValue);
        const [count, setCount] = useState(1)
        const [seats, setSeats] = useState(10);

        function enroll(){
            if (seats > 0) {
                setCount(count + 1);
                console.log('Enrollees: ' + count);
                setSeats(seats - 1);
                console.log('Seats: ' + seats)
            } else {
                alert("No more seats available");
            };
        }
       return (
             <Card id="courseComponent1">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>PhP {price}</Card.Text>
                    <Card.Text>Seats: {seats}</Card.Text>
                    <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
                </Card.Body>
             </Card>       
        )
   }