import React from "react";
import { Link, Outlet} from 'react-router-dom'
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";

import * as actions from '../../store/modules/auth/actions';

import Loading from "../Loading";

import './styles.css';

export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const iconSize = '25px';
  const iconColor= '#fff';

  return (
    <>
      <nav className="header">
        <Link to='/'>
          <FaHome
            size={ iconSize }
            color={ iconColor }
          />
        </Link>
        
        <div className="user-actions">
          {isLoggedIn ? 
            <Link 
              to='/login' 
              className='logout-btn'
              onClick={() => dispatch(actions.LoginFailure())}
            >
              <FaSignOutAlt
                size={ iconSize }
                color='inherit'
                />
            </Link> :
            <Link to='/login' className='login-btn'>
            <FaSignInAlt
              size={ iconSize }
              color={ iconColor }
              />
          </Link>
          }
          <Link to='/user'>
            <FaUser
              size={ iconSize }
              color={ iconColor }
              />
          </Link>
        </div>
      </nav>

      <Loading />

      <Outlet/>
    </>
  )
}
