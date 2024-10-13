import React, { useState, useEffect } from 'react';
import '../styles/Home.css'; // Import CSS for styling
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faGraduationCap,
  faHouseChimney,
  faSortDown,
  faToolbox,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {

  const divStyle = {
    textAlign: 'center',
    height: '300px',
    lineHeight: '300px',
  }; // to be remove later divstyle


  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  function handleFileUpload(e){
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);
      axios.post('http://localhost:8000/auth/student/studentProfileUpload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/auth/student/home', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  if (!user) {
    return <div style={divStyle}>Loading...</div>;
  }

  return (
    <>
    <nav>
        <div className="navContainer" >
          <div className="navLeftSide">
            <div className="logo">
              <img
                src="../img/logo.png"
                alt="logo"
              />
            </div>
            <input className="inputField" type="text" placeholder="Search" />
          </div>
          <div className="navMiddleSide">

            <Link to={"/notice"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faBell} />
              <h4 className="text">Notice</h4>
            </Link>
            <Link to={"/internship"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faGraduationCap} />
              <h4 className="text">InternShip</h4>
            </Link>
            <Link to={"/placement"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faToolbox} />
              <h4 className="text">Placement</h4>
            </Link>
            <Link to={"/messaging"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faCommentDots} />
              <h4 className="text">Messaging</h4>
            </Link>
            <Link to={"/home"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faHouseChimney} />
              <h4 className="text">Home</h4>
            </Link>
            <Link to={"/logout"} className="link">
              <FontAwesomeIcon className="fa-icon" icon={faSortDown} />
              <h4 className="text">Logout</h4>
            </Link>
          </div>
        </div>
      </nav>


    <div style={divStyle}>
      <h1>Welcome, {user.data.first_name}</h1>
      <p>Email: {user.data.email}</p>
      <label for="fileInput"> Choose a file
    <input type="file" id="fileInput" onChange={handleFileChange} />
  </label>
      <button onClick={handleFileUpload}>Upload File</button>
      <img src={user.data.profile_picture_url} alt="Profile" />
    </div>
    </>
  )
}