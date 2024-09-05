import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AuthGuard from "@components/auth/AuthGuard";
import Navbar from "./components/shared/Navbar";
import useLoadKakao from "@/hooks/useLoadKakao";

const HotelList = lazy(() => import("@/pages/HotelList"));
const Test = lazy(() => import("@/pages/Test"));
const HotelPage = lazy(() => import("@/pages/Hotel"));
const SigninPage = lazy(() => import("./pages/Signin"));
const MyPage = lazy(() => import("./pages/My"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const LikePage = lazy(() => import("@/pages/settings/like"));
const PrivateRoute = lazy(() => import("./components/auth/PrivateRoute"));
const SchedulePage = lazy(() => import("./pages/Schedule"));
const ReservationPage = lazy(() => import("./pages/Reservation"));
const ReservationDonePage = lazy(() => import("./pages/ReservationDone"));
const ReservationListPage = lazy(() => import("./pages/ReservationList"));

function App() {
  useLoadKakao();

  return (
    <Suspense fallback={<></>}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthGuard>
            <Navbar />
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route path="/signin" element={<SigninPage />} />

              <Route
                path="/my"
                element={
                  <PrivateRoute>
                    <MyPage />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/like"
                element={
                  <PrivateRoute>
                    <LikePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<Test />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
