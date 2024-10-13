import axios from "axios"
import React, { useState, useEffect } from 'react';
import "../styles/Internship.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faGraduationCap,
  faHouseChimney,
  faToolbox,
  faEarth,
  faAngleDown,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { WHO_TO_CONNECT } from "../../Data/studentToConnect";

export const Placement_Data = [];

export const Placement = () => {

  const divStyle = {
    textAlign: 'center',
    height: '300px',
    lineHeight: '300px',
  }; // to be remove later divstyle

  const [placementData, setPlacementData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/auth/student/getPlacement', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setPlacementData(res.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);


  if (!placementData) {
    return <div style={divStyle}>Loading....</div>;
  }

  const updatedPlacementData = placementData.map(placement => ({
    post_id: placement.id, // Adjust the key based on your API response
    title: placement.title,
    content: placement.content,
    placement_admin: placement.placement_admin,
    image_url: placement.image_url,
    posted_at: placement.created_at
  }));

  Placement_Data.splice(0, Placement_Data.length, ...updatedPlacementData);


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

      <div className="main">
        <div className="homeContainer">
          <div className="leftSide">
            <div className="profileDiv">
              <div className="backGroundDiv">
                <img
                  src="../img/profile.jpeg"
                  alt=""
                  className="avatarImg"
                />
                <h4 className="avatarName">Name</h4>
                <p className="avatarAbout">
                  Description of Student / Bio / Graduate Year / Skills
                </p>
              </div>
            </div>
            
          </div>
          <div className="middleSide">

            {Placement_Data.map((el, i) => (
              <UserPosts
                key={i}
                title={el.title}
                content={el.content}
                image_url={el.image_url}
                created_at={el.posted_at}
              />
            ))}

          </div>
          <div className="rightSide">
            <div className="rightContainer">
              <h3 className="connectHeading">Who to Message</h3>
              <hr className="connectLine" />
              {WHO_TO_CONNECT.map((el, i) => (
                <WhoToconnect
                  key={i}
                  name={el.name}
                  username={el.username}
                  avatar={el.avatar}
                />
              ))}
              <hr />
              <div className="showMorediv">
                <h4>
                  Show more <FontAwesomeIcon icon={faAngleDown} />{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function UserPosts(props) {
  return (
    <div className="postsMainDiv">
      <div className="useDetails">
        <div className="avatarDetails">
          <div>
            <h4>{props.title}</h4>
            <p>{props.content}</p>
            <div className="postime">
              <p>{props.posted_at}</p>
              <div className="dot"></div>
              <FontAwesomeIcon className="earthIcon" icon={faEarth} />
            </div>
          </div>
        </div>
      </div>
      <div className="aboutPost">
        <p>{props.content}</p>
      </div>
      <div className="postPicture">
        <img src={props.image_url} alt="" />
      </div>
    </div>
  );
}

const WhoToconnect = (props) => {
  return (
    <div className="whoToConnect_container">
      <div className="account">
        <div className="img_src">
          <img src={props.avatar} alt="profile" />
        </div>
        <div className="connect_user_name">
          <h3>{props.name}</h3>
        </div>
      </div>

      <button className="connect_btn">Message</button>
    </div>
  );
};
