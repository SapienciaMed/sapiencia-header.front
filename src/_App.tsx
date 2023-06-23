import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/components/Header";
import { AppContextProvider } from "./common/contexts/header.context";

export default function App(props) {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}
