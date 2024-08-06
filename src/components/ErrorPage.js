import React , {useState} from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'


const ErrorPage = () => {


  return (
    <>
    <Header />
    <p>You must have came to wrong route.</p>
    </>
  )
}

export default ErrorPage