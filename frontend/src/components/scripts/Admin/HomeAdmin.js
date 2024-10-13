import React from 'react';
import { BrowserRouter as Router,  Link } from 'react-router-dom';
import NoticeForm from './NoticeForm';
import PlacementForm from './PlacementForm';
import InternshipForm from './InternshipForm';

export const HomeAdmin = () => {
  return (
    <div>
      <h1>Add Post</h1>
      <div>
        <ul>
          <li><Link to="/noticeForm">Add Notice</Link></li>
          <li><Link to="/placementForm">Add Placement</Link></li>
          <li><Link to="/internshipForm">Add Internship</Link></li>
        </ul>

      </div>
    </div>
  );
};

