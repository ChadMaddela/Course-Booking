import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CourseSearch from './CourseSearch';

export default function UserView({ coursesData }) {
  const [courses, setCourses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

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

  return (
    <>
      <CourseSearch
        onSearchByName={handleSearchByName}
        onSearchByPrice={handleSearchByPrice}
      />
      {filteredCourses.map(course => (
        course.isActive && <CourseCard courseProp={course} key={course._id} />
      ))}
    </>
  );
}
    