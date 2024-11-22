import React, {useState} from 'react'
import Modal from './Modal'
import Authentication from './Authenticatication'
import { useAuth } from '../context/AuthContext'

const Layout = (props) => {
  const {children} =  props
  const [showModal, setShowModal] = useState(false)
  const {globalUser, logOut} = useAuth()
  const header = (
    <header>
      <div>
        <h1 className='text-gradient'>CAFFEIND </h1>
        <p>For coffee Insatiates</p>
        
      </div> 
      {
        !globalUser ? <button onClick={() => setShowModal(!showModal)}><p>SignUp Free</p>
      <i class="fa-solid fa-mug-hot"></i> </button> : <button onClick={() => logOut()}><p>Logout</p> </button>
      }
    </header>
  )

  const footer = (
    <footer>
      <p> <span className='text-gradient'>Caffeind
        </span> Made by <a>Kenneth</a></p>
        <span>Check out the project on <a target='_blank' href='https://www.github.com/...'>GitHub</a></span>
    </footer>
  )
  return (
    <>
   {
    showModal &&  <Modal handleCloseModal={() => setShowModal(false)} >
    <Authentication handleCloseModal={() => {setShowModal(false)}} />
  </Modal>
   }
    {header}
    <main>
    {children}
    </main>
    {footer}
    </>
  )
}

export default Layout
