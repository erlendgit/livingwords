import {Routes, Route} from "react-router-dom";
import {BookList} from "./components/Books/BookList.tsx";
import {BookDetail} from "./components/Books/BookDetail.tsx";
import {Layout} from "./layouts/layout.tsx";
import {ContentEditor} from "./components/Editor/ContentEditor.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<BookList/>}/>
                <Route path="/book/:id" element={<BookDetail/>}/>
                <Route path="/book/:id/edit" element={<ContentEditor />}/>
            </Route>
        </Routes>
    )
}

export default App
