import { Routes, Route } from "react-router-dom";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

import { Modal } from "../modal/Modal";

import { RegisterPage } from "../pages/registerPage/RegisterPage";
import { LoginPage } from "../pages/loginPage/LoginPage";
import { MainPage } from "../pages/mainPage/MainPage";
import { CartPage } from "../pages/cortPage/CartPage";
import { CategoryPage } from "../pages/categoryPage/CategoryPage";
import { CatalogPage } from "../pages/catalogPage/CatalogPage";
import { FavoritesPage } from "../pages/favoritesPage/FavoritesPage";
import { PaymentPage } from "../pages/paymentPage/PaymentPage";
import { NewsPage } from "../pages/newsPage/NewsPage";
import { AboutPage } from "../pages/aboutPage/AboutPage";
import { ContactsPage } from "../pages/contactsPage/ContactsPage";
import { SearchResultsPage } from "../pages/searchResultsPage/searchResultsPage";
import { CardDetail } from "../pages/cardDetail/CardDetail";
import { Flashlight } from "../pages/Flashlight";
import { Rules } from "../pages/Rules";
import { SendMail } from "../pages/sendMail/SendMail";

import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { Page404 } from "../pages/404/Page404";

import { me } from "../../redux/auth/authSlice";
import { getGoods } from "../../redux/goods/goodsSlice";

const App = memo(() => {

const dispatch = useDispatch();
const { showModal, message: messageAuth } = useSelector(state => state.authSlice);
const { message: messageGoods } = useSelector(state => state.goodsSlice); 




useEffect(() => {
  dispatch(me())
  dispatch(getGoods())
}, [dispatch])


return (
  <div className="app" id="app">
    <div className="app__overlay"></div>
    
    <ErrorBoundary>
      <Header />
    </ErrorBoundary> 
    
    <div className="app-container">
      <Routes>

        <Route path="/register" element={<ErrorBoundary><RegisterPage/></ErrorBoundary>}/>
        <Route path="/login" element={<ErrorBoundary><LoginPage/></ErrorBoundary>}/>
        <Route path="/cort" element={<ErrorBoundary><CartPage/></ErrorBoundary>}/>
        <Route path="/category/:categoryName" element={<ErrorBoundary><CategoryPage /></ErrorBoundary>}/>
        <Route path="/catalog/:catalogName" element={<ErrorBoundary><CatalogPage /></ErrorBoundary>}/>
        <Route path="/favorites" element={<ErrorBoundary><FavoritesPage /></ErrorBoundary>}/>

        <Route path="/about" element={<ErrorBoundary><AboutPage /></ErrorBoundary>}/>
        <Route path="/contacts" element={<ErrorBoundary><ContactsPage /></ErrorBoundary>}/>
        <Route path="/payment" element={<ErrorBoundary><PaymentPage /></ErrorBoundary>}/>
        <Route path="/news" element={<ErrorBoundary><NewsPage /></ErrorBoundary>}/>
        <Route path="/search_results" element={<ErrorBoundary><SearchResultsPage /></ErrorBoundary>}/>
        <Route path="/card_detail/:id" element={<ErrorBoundary><CardDetail /></ErrorBoundary>}/>
        <Route path="/rules" element={<ErrorBoundary><Rules /></ErrorBoundary>}/>
        <Route path="/flashlight" element={<ErrorBoundary><Flashlight /></ErrorBoundary>}/>
        <Route path="/send_mail" element={<ErrorBoundary><SendMail /></ErrorBoundary>}></Route>

        <Route path="/" element={<ErrorBoundary><MainPage/></ErrorBoundary>}/>

        <Route path="*" element={<Page404 />}/>

      </Routes>
    </div>

    <Modal message={[messageAuth, messageGoods]} showModal={showModal} />
    
    <ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  </div>
);
})

export default App;
