import {Routes, Route} from "react-router-dom";
import {BookList} from "./components/Book/BookList.tsx";
import {BookDetail} from "./components/Book/BookDetail.tsx";
import {PageLayout} from "./layouts/PageLayout.tsx";
import {ContentEditor} from "./components/Editor/ContentEditor.tsx";
import CssBaseline from '@mui/material/CssBaseline';


function App() {
    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/book/:id" element={<BookDetail/>}/>
                    <Route path="/book/:id/edit" element={<ContentEditor/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
