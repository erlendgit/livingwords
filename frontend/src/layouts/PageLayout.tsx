import {Link, Outlet} from "react-router-dom";
import MainWidget from "../widgets/containers/MainWidget.tsx";
import HeaderWidget from "../widgets/layout/HeaderWidget.tsx";

export function PageLayout() {
    return (
        <MainWidget>
            <HeaderWidget>
                <Link to="/">
                    <h1 style={{fontSize: "1.5em"}}>My Books App</h1>
                </Link>
            </HeaderWidget>
            <Outlet/>
        </MainWidget>
    );
}