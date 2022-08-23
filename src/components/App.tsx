import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import ProfilePage from "./ProfilePage";
import UserProfileInput from "./UserProfileInput";
import RepositoryPage from "./RepositoryPage";


export default () => {
  return (
    <div className="App full half-1000">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route index element={<UserProfileInput/>}/>
            <Route path=":userLogin" element={(
              <>
                <UserProfileInput/>
                <ProfilePage/>
              </>
            )}>
              <Route path=":repoName" element={<RepositoryPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  )
}