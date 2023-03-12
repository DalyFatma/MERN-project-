import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/routes/PrivateRoutes';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard'
import { getCurrent } from './Redux/actions/actionsUser/actionsUser';
import Navbar from './components/Navbar/Navbar';
import AddHack from './components/AddHack/AddHack';
import Homepage from './components/HomePage/Homepage';
import EditHack from './components/EditHack/EditHack';
import HairCare from './components/HairCare/HairCare';
import SkinCare from './components/SkinCare/SkinCare';
import Nails from './components/Nails/Nails';
import MakeUp from './components/MakeUp/MakeUp';
import { getAllProducts } from './Redux/actions/actionProduct/actionProduct';
import AddProduct from './components/AddProduct/AddProduct';
import EditeProfileUser from './components/EditProfileUser/EditeProfileUser';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import { getAllHacks } from './Redux/actions/actionHack/actionHack';
import { getUserById } from './Redux/actions/actionAdmin/actionAdmin';



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrent())
    dispatch(getAllHacks())
    dispatch(getAllProducts())
    dispatch(getUserById())
  }, [dispatch])
  return (
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="/login" element={<SignIn/>} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/hack" element={<><AddHack/></>} />
      <Route path="/productreview" element={<><AddProduct/></>} />
      <Route path="/dashboard/hair" element={<><PrivateRoute><Navbar/><HairCare/></PrivateRoute></>} />
     

      <Route path="/dashboard/nails/" element={<><PrivateRoute><Navbar/><Nails/></PrivateRoute></>} />
      
      <Route path="/dashboard/mekeup/" element={<><PrivateRoute><Navbar/><MakeUp/></PrivateRoute></>} />
      

      <Route path="/dashboard/skincare/" element={<><PrivateRoute><Navbar/><SkinCare/></PrivateRoute></>} />
     

      <Route path="/dashboard" element={<><PrivateRoute><Navbar /><Dashboard /></PrivateRoute></>} />
      <Route path='/edithack/:id' element={<><PrivateRoute><Navbar/><EditHack/></PrivateRoute></> }/>
      <Route path="/editprofile/:id" element={<><PrivateRoute><Navbar/> <EditeProfileUser/> </PrivateRoute></>}/>
      <Route path="/admin" element={<PrivateRoute><Navbar/><DashboardAdmin/></PrivateRoute>} />
      <Route path="/admin/editadmin/:id" element={<PrivateRoute><Navbar/><EditeProfileUser/></PrivateRoute>} />
    </Routes>
    
  );
}

export default App;
