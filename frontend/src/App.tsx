import {Routes, Route} from "react-router-dom";
import './App.css'
import {BookList} from "./components/Books/BookList.tsx";
import {BookDetail} from "./components/Books/BookDetail.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<BookList/>}/>
            <Route path="/book/:id" element={<BookDetail/>}/>
        </Routes>
    )
}

export default App
