import { Routes,Route } from "react-router";
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EmailVerified from "./pages/Auth/EmailVerified";
import GoogleLoginFailure from "./pages/Auth/GoogleLoginFailure";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/email-verified" element={<EmailVerified/>}/>
      <Route path="/google-login-failure" element={<GoogleLoginFailure/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}