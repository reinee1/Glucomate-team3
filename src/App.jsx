import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import HomePage from "./pages/homepage";
import SignupPage from "./pages/signuppage";
import LoginPage from "./pages/loginpage";
import ChatbotPage from "./pages/chatbotpage";
import AccountUpdatePage from "./pages/accountpage";
import PersonalInfoPage from "./pages/personalinfoform";
import MedicalHistoryPage from "./pages/medicalhistoryform";
import LifestyleHabitsPage from "./pages/lifestyleform";
import MonitoringControlPage from "./pages/monitorform";
import VoiceChatPage from './pages/VoiceChat';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/accountpage" element={<AccountUpdatePage />} />
          
          <Route path="/personalinfo" element={<PersonalInfoPage />} />
          <Route path="/medicalinfo" element={<MedicalHistoryPage />} />
          <Route path="/lifestyleform" element={<LifestyleHabitsPage />} />
          <Route path="/monitorform" element={<MonitoringControlPage />} />
          
          <Route path="/voicechatpage" element={<VoiceChatPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}