import {BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import CourseView from './pages/CourseView';
import AddCourse from './pages/AddCourse';
import './App.css';
import { UserProvider } from './UserContext'
import {Container} from 'react-bootstrap';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  useEffect(() => {
    console.log(user);
    console.log(localStorage)
  }, [user]);

  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/addCourse" element={<AddCourse />} />
            <Route path="/courses/:courseId" element={<CourseView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container> 
      </Router>
    </UserProvider>
  );
}

export default App;
