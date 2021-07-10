import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseUrl, setAuthToken } from "./api/config";
import { useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";

import AuthRoute from "./private/AuthRoute";

import MainNav from "./components/navigation/MainNav";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Forbidden from "./pages/Forbidden";
import UserData from "./pages/Admin/UserData";
import CriteriaData from "./pages/Admin/CriteriaData";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import ProfileMhs from "./pages/Mahasiswa/ProfileMhs";
import ProfileDospem from "./pages/Dospem/ProfileDospem";
import ProfileKaprodi from "./pages/Kaprodi/ProfileKaprodi";
import ProfileBaak from "./pages/BAAK/ProfileBaak";
import Guide from "./pages/Mahasiswa/Guide";
import PengajuanJudul from "./pages/Mahasiswa/PengajuanJudul";
import JudulDospem from "./pages/Dospem/JudulDospem";
import JudulKaprodi from "./pages/Kaprodi/JudulKaprodi";

import { AdminNavContextProvider } from "./context/navContext/adminNavContext";
import { MhsNavContextProvider } from "./context/navContext/mhsNavContext";
import { DospemNavContextProvider } from "./context/navContext/dospemNavContext";
import { KaprodiNavContextProvider } from "./context/navContext/kaprodiNavContext";
import { BaakNavContextProvider } from "./context/navContext/baakNavContext";

import { UserContext } from "./context/userContext";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const queryClient = new QueryClient();

  const [user, userDispatch] = useContext(UserContext);

  const checkAuth = async () => {
    try {
      const response = await BaseUrl.get("/check-auth");

      if (response.status === 404) {
        return userDispatch({ type: "AUTH_ERROR" });
      }

      let payload = response.data.data;
      payload.user.token = localStorage.token;

      userDispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      userDispatch({
        type: "AUTH_ERROR",
      });
    }
  };
  console.log(user);

  useState(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminNavContextProvider>
        <BaakNavContextProvider>
          <KaprodiNavContextProvider>
            <DospemNavContextProvider>
              <MhsNavContextProvider>
                <Router>
                  <AnimatePresence>
                    <MainNav user={user} userDispatch={userDispatch} />
                    <Switch>
                      <Route exact path="/forbidden" component={Forbidden} />
                      {user.loginStatus ? (
                        <AuthRoute exact path="/" component={Dashboard} />
                      ) : (
                        <Route exact path="/" component={Landing} />
                      )}
                      <AuthRoute exact path="/user-data" component={UserData} />
                      <AuthRoute
                        exact
                        path="/criteria-data"
                        component={CriteriaData}
                      />
                      <AuthRoute
                        exact
                        path="/profile-admin"
                        component={ProfileAdmin}
                      />
                      <AuthRoute
                        exact
                        path="/profile-mhs"
                        component={ProfileMhs}
                      />
                      <AuthRoute
                        exact
                        path="/profile-dospem"
                        component={ProfileDospem}
                      />
                      <AuthRoute
                        exact
                        path="/profile-kaprodi"
                        component={ProfileKaprodi}
                      />
                      <AuthRoute
                        exact
                        path="/profile-baak"
                        component={ProfileBaak}
                      />
                      <AuthRoute exact path="/guide" component={Guide} />
                      <AuthRoute
                        exact
                        path="/judul"
                        component={PengajuanJudul}
                      />
                      <AuthRoute
                        exact
                        path="/judul-laporan-dospem"
                        component={JudulDospem}
                      />
                      <AuthRoute
                        exact
                        path="/judul-laporan-kaprodi"
                        component={JudulKaprodi}
                      />
                    </Switch>
                  </AnimatePresence>
                </Router>
              </MhsNavContextProvider>
            </DospemNavContextProvider>
          </KaprodiNavContextProvider>
        </BaakNavContextProvider>
      </AdminNavContextProvider>
    </QueryClientProvider>
  );
}

export default App;
