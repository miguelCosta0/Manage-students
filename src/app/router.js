import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import Header from '../components/Header';
import PrivateRoute from './routes/PrivateRoute';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import Home from './routes/HomePage/Home';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import User from './routes/User';
import EditUser from './routes/User/edit';
import Students from './routes/Students/index';
import EditStudent from './routes/Students/edit';
import CreateStudent from './routes/Students/create';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Header />} errorElement={<ErrorPage />}>

      {/* Login required */}
      <Route element={<PrivateRoute />}>
        <Route path='/user' element={<User />} />
        <Route path='/user/edit' element={<EditUser />} />

        <Route path='/students/edit/:id' element={<EditStudent />} />
        <Route path='/students/create/' element={<CreateStudent />} />
      </Route>
      
      <Route path='/' element={<Home />} />
      <Route path='/students' element={<Students />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />


    </Route>
  )
);

export default router;