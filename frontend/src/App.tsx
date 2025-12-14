import { Routes, Route } from "react-router-dom";
import { BookList } from "./components/Book/BookList.tsx";
import { BookDetailPage } from "./components/Book/BookDetailPage.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import ContentEditorPage from "./components/Editor/ContentEditorPage.tsx";

function App() {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetailPage />} />
                    <Route
                        path="/book/:id/edit/:chapter/:verse"
                        element={<ContentEditorPage />}
                    />
                    <Route
                        path="/book/:id/edit"
                        element={<ContentEditorPage />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
