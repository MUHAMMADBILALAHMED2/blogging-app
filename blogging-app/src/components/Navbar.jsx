import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../Config/firebase/FirebaseMethod'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import AccountMenu from './Menu'

const Navbar = ({ profile, login, register, dashbord, userName }) => {
  const [checkuser, setcheckuser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user login ha')
        setcheckuser(user)
      } else {
        console.log('user logout ho giya ha');
        setcheckuser(false)
      }
    })
  }, [])

  return (
    <>
      <section className=' bg-blue-500'>
        <nav className='p-4 text-white mx-auto container flex justify-between items-center'>
          <div>
            <Typography variant='h6'>
              Personal Blogging App
            </Typography>
          </div>
          <div>
            <ul className='flex gap-2 items-center'>
              <li><Link to='/profile'></Link></li>
              <li>{checkuser ? <AccountMenu/> : <Link to='/login'>{login}</Link>}</li>
              <li><Link to='/register'>{register}</Link></li>
            </ul>
          </div>
        </nav>
      </section>
    </>
  )
}

export default Navbar