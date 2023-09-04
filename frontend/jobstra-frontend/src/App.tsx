import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RootLayout from "./pages/layouts/RootLayout";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: null,
            children: [
              {
                index: true,
                element: <HomePage />,
              }
            ],
        },
    ]);

    return (
        // <Suspense> tag instead of <> allows us to use fallback while the route is finished loading <Suspense fallback={<Loading />}>
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
