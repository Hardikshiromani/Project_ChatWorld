
import  Loginform  from './pages/Loginform';
import {   Routes, Route } from "react-router-dom";
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import Profilepage from './pages/Profilepage'
import ChatPage from './pages/ChatPage'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
   <Routes>
      <Route path='/' element= {<Loginform/>}/>
       <Route path='/signup'element= { <Signup/>}/>
       <Route path='/Profilepage'element= { <Profilepage/>}/>
       <Route path='/ChatPage'element= { <ChatPage/>}/>
       </Routes>
      
    
    </>
  );
}

export default App
