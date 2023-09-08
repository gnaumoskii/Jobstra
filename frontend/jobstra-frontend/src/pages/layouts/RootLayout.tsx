import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

const RootLayout = () => {
    return (
        <>
            <nav>
                <Header />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
