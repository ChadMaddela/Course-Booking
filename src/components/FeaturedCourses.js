import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewCourses from './PreviewCourses';

export default function FeaturedCourses() {

	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			const numbers = []
			const featured = []

			// This function generates a random number between 0 and the length of the data array (the fetched course data). It checks if the random number has already been added to the numbers array. If not, it adds the random number to the numbers array. If the random number already exists in the numbers array, it recursively calls itself to generate a new random number.

			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.courses.length)

				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum)
				} else {
					generateRandomNums()
				}
			}

			for(let i = 0; i < 5; i++){
				generateRandomNums()

				featured.push(
					<PreviewCourses data = {data.courses[numbers[i]]} key={data.courses[numbers[i]]._id} breakPoint={2} />
				)	
			}

			setPreviews(featured)
		})
	}, [])

	return(
		<>
			<h2 className="text-center">Featured Courses</h2>
			<CardGroup className="justify-content-center">
			{previews}
			</CardGroup>
		</>

	)
}