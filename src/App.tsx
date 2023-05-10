/** @format */
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./AuthContext";
import { Login, SignUp, Home, NotFound, SinglePost, Preference } from "./pages";
import { Header } from "./components";


function App() {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/preference" element={<Preference />} />
            {/* <Route path="/posts/:id" element={<SinglePost />} /> */}
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
