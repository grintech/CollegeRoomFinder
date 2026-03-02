import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Myaccount = () => {
    const {user} = useAuth();
    console.log(user)
  return (
    <>
        <div className="my_account min_height">
            <div className="container py-5">
                <h1 className="text-center fw-bold">Welcome <span className="text_theme text-capitalize">"{user.name}"</span> </h1>
            </div>
        </div>
    </>
  )
}

export default Myaccount