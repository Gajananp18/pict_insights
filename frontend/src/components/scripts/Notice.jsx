import axios from "axios"
import React, { useState, useEffect } from 'react';
import "../styles/Notice.css";
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

export const Notice_Data = [];

export const Notice = () => {

  const divStyle = {
    textAlign: 'center',
    height: '300px',
    lineHeight: '300px',
  }; // to be remove later divstyle

  const [noticeData, setNoticeData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/auth/student/getNotice', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setNoticeData(res.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  if (!noticeData) {
    return <div style={divStyle}>Loading....</div>;
  }

  const updatedNoticeData = noticeData.map(notice => ({
    notice_id: notice.id, // Adjust the key based on your API response
    title: notice.title,
    content: notice.content,
    notice_admin: notice.notice_admin,
    event_date: notice.event_date,
    image_url: notice.image_url,
    created_at: notice.created_at
  }));

  Notice_Data.splice(0, Notice_Data.length, ...updatedNoticeData);

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

            {Notice_Data.map((el, i) => (
              <UserPosts
                key={i}
                title={el.title}
                content={el.content}
                event_date={el.event_date}
                image_url={el.image_url}
                created_at={el.created_at}
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
              <p>{props.created_at}</p>
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
