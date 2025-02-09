import React from "react";
import { FaUserCircle} from 'react-icons/fa';

import './css/profilePic.css';

export default function StudentProfilePicture({ url }) {
  return (url ?
    <img src={url} alt='' /> :
    <FaUserCircle
      size='auto'
      color={'#ccc'}
    />
  );
}