import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MeetingDetails from "./pages/MeetingDetails";
import Chat from "./pages/Chat";
import LiveMeeting from "./pages/LiveMeeting";

// Existing Pages
import Meetings from "./pages/Meetings";
import UploadMeeting from "./pages/UploadMeeting";
import CompanyChat from "./pages/CompanyChat";
// Temporary Placeholder
function Settings() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        ⚙ Settings
      </h1>

      <p className="mt-3 text-gray-600">
        Language, Avatar and AI settings will be added here.
      </p>
    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* Dashboard */}
      <Route
        path="/"
        element={<Dashboard />}
      />

      {/* Meetings */}
      <Route
        path="/meetings"
        element={<Meetings />}
      />

      {/* Meeting Details */}
      <Route
        path="/meeting/:id"
        element={<MeetingDetails />}
      />

      {/* Upload */}
      <Route
        path="/upload"
        element={<UploadMeeting />}
      />

      {/* AI Chat */}
      <Route
        path="/chat"
        element={<Chat />}
      />
      <Route
  path="/company-chat"
  element={<CompanyChat />}
/>

      {/* Live Meeting */}
      <Route
        path="/live-meeting"
        element={<LiveMeeting />}
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={<Settings />}
      />

    </Routes>
  );
}

export default App;