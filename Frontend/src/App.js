import './App.css';
import Navbar from './Layouts/Navbar';
import Home from './Components/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import ContextData from './Context/Context'
import Profile from './Components/Profile';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Address from './Components/Address';
import Payment from './Components/Payment';
import Summary from './Components/Summary';
import PaymentSuccessfull from './Components/PaymentSuccessfull';
import MyOrders from './Components/MyOrders';
import DisplayProduct from './Components/DisplayProduct';
import TopLoadingBar from './Components/TopLoadingBar';
import Footer from './Components/Footer';
import SearchResult from './Components/SearchResult';
import PaymentFailed from './Components/PaymentFailed';
import ErrorPage from './Components/ErrorPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextData>
          <TopLoadingBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn  />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/:products" element={<Products />} /> 
            <Route path="/success" element={<PaymentSuccessfull />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/product/:id" element={<DisplayProduct />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/failed" element={<PaymentFailed />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </ContextData>
      </BrowserRouter>
    </div>
  )
}


export default App;
