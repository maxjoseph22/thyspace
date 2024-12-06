import React from 'react';
import Shield from '../../assets/Shield.png'; // Adjust the import path as needed
import './ProfileImage.css'; // Create this CSS file with the styles you provided

const ProfileImage = ({ user }) => {
  return (
    <div className="profile-image-container">
      <img
        src={Shield}
        alt="Shield"
        className="shield-overlay"
      />
      <img 
        className="avatar-image"
        src={user.avatar || "http://via.placeholder.com/150"}
        alt={`${user.firstname || 'User'}'s Profile Pic`}
      />
    </div>
  );
};

export default ProfileImage;