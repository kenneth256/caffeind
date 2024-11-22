import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import CoffeeForm from './components/Coffee'
import History from './components/History'
import Stats from './components/Stats'
import { useAuth } from './context/AuthContext'

const App = () => {
  const {globalUser, globalData, isLoading} = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && Object.keys(globalData || {}).length
  const authenticatedContent = (
    <>
     <Stats />
    <History />
   
    </>
  )
  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated}  />
      {
        (isAuthenticated && isLoading) && <p>Loading data...</p>
      }
      {
        (isAuthenticated && isData) && (authenticatedContent)
      }
    </Layout>
  )
}

export default App
