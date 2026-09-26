import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ElectionRegister from "./pages/elections/Register";
import Register from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Apply from "./pages/voting/Apply";
import Vote from "./pages/Vote";
import VotingCenter from "./pages/VotingCenter";
import Pvc from "./pages/Pvc";
import Polls from "./pages/Polls";
import History from "./pages/History";
import Settings from "./pages/Settings";
import ProfileSettings from "./components/layouts/Settings/ProfileSettings";
import SecuritySettings from "./components/layouts/Settings/SecuritySettings";
import HelpSupport from "./components/layouts/Settings/HelpSupport";
import ChangePassword from "./components/layouts/Settings/ChangePassword";

// Admin Route imports
import AdminLogin from "./admin/pages/Login.jsx";
import InviteAdmin from "./admin/pages/Invite.jsx";
import AdminProtectedRoute from "./admin/routes/AdminProtectedRoute.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import ViewUsers from "./admin/pages/ViewUsers.jsx";
import User from "./admin/pages/User.jsx";
import ViewVoters from "./admin/pages/ViewVoters.jsx";
import CreateElection from "./admin/pages/CreateElection.jsx";
import ElectionsOverview from "./admin/pages/ViewElections.jsx";
import Election from "./admin/pages/Election.jsx";
import ElectionParties from "./admin/pages/ElectionParties.jsx";
import Parties from "./admin/pages/Parties.jsx";
import ViewParty from "./admin/pages/ViewParty.jsx";
import CreateParty from "./admin/pages/CreateParty.jsx";
import EditParty from "./admin/pages/EditParty.jsx";
import CreateCandidate from "./admin/pages/CreateCandidate.jsx";
import Candidates from "./admin/pages/Candidates.jsx";
import CreatePosition from "./admin/pages/CreatePosition.jsx";
import Positions from "./admin/pages/Positions.jsx";
import PollResults from "./admin/pages/Polls";
import PVCVerification from "./pages/PvcVerification.jsx";
import ElectionsPage from "./pages/Elections.jsx";
import VotingGuidelines from "./pages/Guidelines.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import CandidatesPage from "./pages/Candidates.jsx";
import CandidateProfile from "./pages/CandidateProfile.jsx";
import ResultsPage from "./pages/Results.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pvc-verification" element={<PVCVerification />} />
        <Route path="/elections" element={<ElectionsPage />} />
        <Route path="/guidelines" element={<VotingGuidelines />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<CandidateProfile />} />
        <Route path="/results" element={<ResultsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/voting/apply" element={<Apply />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/voting" element={<VotingCenter />} />
          <Route path="/pvc" element={<Pvc />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/history" element={<History />} />

          <Route path="settings" element={<Settings />}>
            <Route index element={<ProfileSettings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/elections/:id/register" element={<ElectionRegister />} />

        {/*Admin routes*/}

        <Route path="/admin">
          {/* Public admin routes */}
          <Route path="login" element={<AdminLogin />} />
          <Route path="invite_admin" element={<InviteAdmin />} />

          {/* Protected admin routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="view-users" element={<ViewUsers />} />
            <Route path="users/:id" element={<User />} />

            <Route path="view-voters" element={<ViewVoters />} />

            <Route path="elections">
              <Route index element={<ElectionsOverview />} />
              <Route path="view" element={<ElectionsOverview />} />
              <Route path="create" element={<CreateElection />} />
              <Route path=":id" element={<Election />} />
              <Route path=":id/parties" element={<ElectionParties />} />
            </Route>

            <Route path="parties">
              <Route index element={<Parties />} />
              <Route path="view" element={<Parties />} />
              <Route path=":id" element={<ViewParty />} />
              <Route path="create" element={<CreateParty />} />
              <Route path=":id/edit" element={<EditParty />} />
            </Route>

            <Route path="candidates">
              <Route index element={<Candidates />} />
              <Route path="view" element={<Candidates />} />
              <Route path="create" element={<CreateCandidate />} />
            </Route>

            <Route path="positions">
              <Route index element={<Positions />} />
              <Route path="view" element={<Positions />} />
              <Route path="create" element={<CreatePosition />} />
            </Route>

            <Route path="polls">
              <Route index element={<PollResults />} />
              <Route path="view" element={<PollResults />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
