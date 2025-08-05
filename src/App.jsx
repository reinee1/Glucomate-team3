import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import SignupPage from "./pages/signuppage";
import LoginPage from "./pages/loginpage";
import ChatbotPage from "./pages/chatbotpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}> </Route>
        <Route path="/signuppage" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/chatbot" element={<ChatbotPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}