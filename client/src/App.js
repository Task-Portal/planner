import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/menu/Menu";
import Routes from "./components/Routes";

const App = () => {
  return(
      <BrowserRouter>
        <Menu/>
        <Routes/>
      </BrowserRouter>
  )
};

export default App;

//
// .hover_img a { position:relative; }
// .hover_img a span { position:absolute; display:none; z-index:99; }
// .hover_img a:hover span { display:block; }
// HTML :
//
//     <div class="hover_img">
//         <a href="#">Show Image<span><img src="images/01.png" alt="image" height="100" /></span></a>
//     </div>
