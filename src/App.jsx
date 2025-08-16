import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import SignupPage from "./pages/signuppage";
import LoginPage from "./pages/loginpage";
import ChatbotPage from "./pages/chatbotpage";
import AccountUpdatePage from "./pages/accountpage";
import PersonalInfoPage from "./pages/personalinfoform";
import MedicalHistoryPage from "./pages/medicalhistoryform";
import MonitoringControlPage from "./pages/monitorform";
import LifestyleHabitsPage from "./pages/lifestyleform";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}> </Route>
        <Route path="/signuppage" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/chatbot" element={<ChatbotPage />}></Route>
        <Route path="/accountpage" element={<AccountUpdatePage />}></Route>
        <Route path="/personalinfo" element={<PersonalInfoPage />}></Route>
        <Route path="/medicalinfo" element={<MedicalHistoryPage />}></Route>
        <Route path="/monitorform" element={<MonitoringControlPage />}></Route>
        <Route path="/lifestyleform" element={<LifestyleHabitsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}