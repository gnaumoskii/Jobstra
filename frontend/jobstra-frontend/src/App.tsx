import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RootLayout from "./pages/layouts/RootLayout";
import JobApplicationDetails from "./components/job-application-details/JobApplicationDetails";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorize, disauthorize } from "./store/authSlice";
import { refreshAccessToken } from "./services/api/authApi";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
  const refreshAccessTokenHandler = useCallback(async () => {
    const refreshedToken = await refreshAccessToken();
    refreshedToken.isAuthorized ? dispatch(authorize(refreshedToken.username)) : dispatch(disauthorize());

  }, [dispatch]);
  useEffect(() => {
    refreshAccessTokenHandler();
  }, [refreshAccessTokenHandler])

  useEffect(() => {

    const timeToRefresh = (1000*60*15) - (1000*60);
    const interval = window.setInterval(refreshAccessTokenHandler, timeToRefresh);
    
    
    if(!isAuthorized) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [isAuthorized,dispatch,refreshAccessTokenHandler]); 

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: null,
            children: [
              {
                index: true,
                element: <HomePage />,

              },
              {
                path: "applications/:id",
                element: <JobApplicationDetails />,
              },
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "register",
                element: <Register />,
              },
              {
                path: "about",
                element: <About />,
              }
            ],
        },
    ]);

    return (
        // <Suspense> tag instead of <> allows us to use fallback while the route is finished loading <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
    );
}

export default App;
