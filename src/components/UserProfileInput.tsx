import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const { userLogin } = useParams();
  const [profileLogin, setProfileLogin] = useState(userLogin);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<any>) => setProfileLogin(e.target.value);
  const handleSubmit = () => navigate(`/${profileLogin}`)

  return (
    <form className="UserProfileInput flex-inline" onSubmit={handleSubmit}>
      <label><input value={profileLogin} onChange={handleChange} placeholder='Please input user login'/></label>
      <button type='submit'>Submit</button>
    </form>
  )
}