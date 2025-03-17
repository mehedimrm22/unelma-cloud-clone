import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import FileUpload from "./components/FileUpload";
import AllUploads from "./components/AllUploads";
import { ThemeProvider } from "./context";
import HomePage from "./components/HomePage";




function App() {

  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="register" element={<RegisterForm />}></Route>
            <Route path="home" element={<HomePage></HomePage>}></Route>
            <Route path="login" element={<LoginForm />}></Route>
            <Route path="file-upload" element={<FileUpload />}></Route>
            <Route path="all-uploads" element={<AllUploads />}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
