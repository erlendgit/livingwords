import {Link, Outlet} from "react-router-dom";

export function PageLayout() {
    return (
        <main className="container">
            <header>
                <Link to="/">
                    <h1 style={{fontSize: "1.5em"}}>My Books App</h1>
                </Link>
            </header>

            <Outlet/>

            <footer>
                PICO.css | <small>© 2025</small>
            </footer>
        </main>
    );
}