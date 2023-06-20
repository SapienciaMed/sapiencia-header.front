import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/components/Header";

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}
