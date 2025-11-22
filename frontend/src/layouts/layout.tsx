import {Link, Outlet} from "react-router-dom";

export function Layout() {
    return (
        <main className="container">
            <header>
                <Link to="/">
                    <h1>My Books App</h1>
                </Link>
            </header>

            <Outlet/>

            <footer>
                PICO.css | <small>© 2025</small>
            </footer>
        </main>
    );
}