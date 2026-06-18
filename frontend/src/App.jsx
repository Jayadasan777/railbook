import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTrain from "./pages/AddTrain";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ViewTrains from "./pages/ViewTrains";
import PNRStatus from "./pages/PNRStatus";
import EditTrain from "./pages/EditTrain";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-train"
          element={
            <ProtectedRoute>
              <AddTrain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-trains"
          element={
            <ProtectedRoute>
              <ViewTrains />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pnr-status"
          element={
            <ProtectedRoute>
              <PNRStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-train"
          element={
            <ProtectedRoute>
              <EditTrain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
