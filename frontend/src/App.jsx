import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
import Allbooks from './pages/Allbooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Viewbookdetails from './components/ViewBookDetails/Viewbookdetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourties from './components/Profile/Favourties'
import OrderHistory from './components/Profile/OrderHistory'
import Settings from './components/Profile/Settings'
import Addbooks from './pages/Addbooks'
import Allorders from './pages/Allorders'
import UpdateBook from './pages/UpdateBook'

function App() {
  const dispatach = useDispatch();
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatach(authActions.login());
      dispatach(authActions.changedRole(localStorage.getItem("role")));
    }
  }, [])


  return (
    <>
      <div>

        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/all-books' element={<Allbooks />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/profile' element={<Profile />}>
            {role === "user" ? (
              <Route index element={<Favourties />} /> ) : ( <Route index element={<Allorders />} />
              )}            
            {role === "admin" && (
             <Route path='/profile/add-book' element={<Addbooks />} />
            )}
            <Route path='/profile/orderHistory' element={<OrderHistory />} />
            <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route path='/update-book/:id' element={<UpdateBook/>} />
          <Route exact path='/view-book-details/:id' element={<Viewbookdetails />} />
        </Routes>
        <Footer />


      </div>
    </>
  )
}

export default App
