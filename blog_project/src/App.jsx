import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import AddPost from './pages/AddPost'
import AllPosts from './pages/AllPosts'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Post from './pages/Post'
import { Protected } from './components'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Protected authentication={false}><Login /></Protected>} />
          <Route path='/signup' element={<Protected authentication={false}><Signup /></Protected>} />
          <Route path='/all-posts' element={<Protected authentication><AllPosts /></Protected>} />
          <Route path='/add-post' element={<Protected authentication><AddPost /></Protected>} />
          <Route path='/edit-post/:slug' element={<Protected authentication><EditPost /></Protected>} />
          <Route path='/post/:slug' element={<Protected authentication><Post /></Protected>} />
        </Routes>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
