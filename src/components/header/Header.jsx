import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, changeTotalSum, setSearchResult } from '../../redux/auth/authSlice';
import { me } from '../../redux/auth/authSlice';

import './header.scss';

import { KnivesCatalog } from '../catalog/knivesCatalog/KnivesCatalog';

import logo from "../../assets/icons/main/logo.svg";
import arrowBottom from "../../assets/icons/main/arrow-bottom.svg";
import favoritesImg from "../../assets/icons/main/favorites.svg";
import cortImg from "../../assets/icons/main/cort.svg";

export const Header = () => {

    //useLocation

    const { pathname } = useLocation();
    
    //useNavigate
    const nav = useNavigate();

    //Selectors

    const cort  = useSelector(state => {
        if(state.authSlice.user) {
            return state.authSlice.user.cort
        }
        return null
    });

    const favorites = useSelector(state => {
        if(state.authSlice.user) {
            return state.authSlice.user.favorites
        }
        return null
    })

    const goods  = useSelector(state => {
        if(state.goodsSlice.goods) {
            return state.goodsSlice.goods
        }
        return null
    });

    const { totalSum } = useSelector(state => state.authSlice);
    const token  = useSelector(state => state.authSlice.token);
    const username  = useSelector(state => state.authSlice.user?.username);

    //Dispatch
    const dispatch = useDispatch();

    //States

    const [showLogout, setShowLogout] = useState(false);
    const [triggerBurger, setTriggerBurger] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    //USE EFFECT

    useEffect(() => {
        const childrenArr = Array.from(new Set(Array.from(refBurgerMenu.current.children).filter(item => item.hasAttribute("data-order")).map(item => item.getAttribute("data-order"))))
        refBurgerMenu.current.style.width = `${(childrenArr.length-1) * 100}%`;
        Array.from(refBurgerMenu.current.children).forEach(ul => {
            ul.style.width = 100/(childrenArr.length-1) + '%';
        })
    }, [])

    useEffect(() => {
        if(!triggerBurger) {
            removeVisibilityFromBurgerLists()
        }
    }, [triggerBurger])

    useEffect(() => {
        setTriggerBurger(false);
    }, [pathname])

    useEffect(() => {
        
    }, [])

    //Handlers

    const handleOpenCloseBurger = () => {
        setTriggerBurger(state => !state)
    }

    const handleShiftFwdBurgerMenu = (e) => {
        const menu = refBurgerMenu.current;
        const targetUl = document.querySelector(`.burger-list[data-related-to=${e.target.getAttribute("data-related-to")}]`);
        targetUl.style.visibility = 'visible';
        const menuLeftNumber = Number(menu.style.left.replace(/%/ig, ''));
        const menuShiftLeftNumber = menuLeftNumber - 100;

        menu.style.left = menuShiftLeftNumber + '%';

    }
    const handleShiftBwdBurgerMenu = (e) => {
        const menu = refBurgerMenu.current;
        const menuLeftNumber = Number(menu.style.left.replace(/%/ig, ''));
        const menuShiftLeftNumber = menuLeftNumber + 100;
        menu.style.left = menuShiftLeftNumber + '%';
        e.target.parentNode.style.visibility = 'hidden';
    }

    const searchHandlerSubmit = (e, searchVal) => {
        e.preventDefault();
        const regExp = new RegExp(searchVal, 'ig');
        const res = goods.filter(item => item.name.match(regExp));
        dispatch(setSearchResult(res));
        nav("/search_results");
        setSearchVal('');
    }

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        setShowLogout(false);
    }

    const getTotalSum = (cort, goods) => {
        let arr = [];
        if(cort && goods) {
            for(let i = 0; i < cort.length; i++) {
                for(let j = 0; j < goods.length; j++) {
                    if(goods[j]._id === cort[i]) {
                        arr.push(Number(goods[j].price.replace(/\D/ig, '')));
                    }
                }
            }
        }
        return arr.reduce((sum, item) => sum + item, 0);
    }   

    const handleRecall = () => {
        const telList = refTel.current.nextElementSibling;
        const telItems = Array.from(telList.children);
        let listHeight = 0;
        telItems.forEach(item => {
            listHeight += item.getBoundingClientRect().height
        })
        if(telList.classList.contains('recall-header__list_active')) {
            refTel.current.style.transform = `rotate(0deg)`;
            telList.style.maxHeight = 0 + 'px';
            telList.classList.remove('recall-header__list_active')
        }else {
            refTel.current.style.transform = `rotate(-180deg)`;
            telList.style.maxHeight = listHeight + 'px';
            telList.classList.add('recall-header__list_active');
        }
    }

    //FUNCTIONS

    const removeVisibilityFromBurgerLists = () => {
        const childrenArr = Array.from(new Set(Array.from(refBurgerMenu.current.children)
        .filter(item => item.hasAttribute("data-order"))
        .filter(item => item.getAttribute("data-order") !== "0")));

        return childrenArr.forEach(ul => ul.style.visibility = 'hidden')
    }


    //Refs

    const refTel = useRef(null);
    const refBurgerMenu = useRef(null);

    //To render
    const user = !token ? 
            <Link to={"/register"} className="header__login">
                <span>Личный кабинет</span>
            </Link> :  
            <div className='header__user-menu'>
                <span onClick={() => {setShowLogout(state => !state)}} >{ username }</span>
                {showLogout && <div onClick={logoutHandler} className="header__user-menu-item">Выйти</div>}
            </div>

    const searchHelper = searchVal !== '' ? 
                            <div className='header__search-helper search-helper'>
                                <ul className="search-helper__list">
                                    { goods && goods.filter(item => {
                                        const regExp = new RegExp('^' + searchVal, 'ig');
                                        return item.name.match(regExp)
                                    }).map(li => {
                                        return (
                                            <li key={li._id} className='search-helper__item'>
                                                <Link onClick={() => setSearchVal('')} to={`/card_detail/${li._id}`} className='search-helper__link'>
                                                    <span>{ li.name }</span>
                                                    <span>{ li.price }</span>
                                                </Link>
                                            </li>
                                        )
                                    }) } 
                                </ul>
                                <Link 
                                    className='search-helper__all'
                                    onClick={e => searchHandlerSubmit(e, searchVal)} 
                                    to={"/search_results"}>Все результаты
                                </Link>
                            </div> : null;

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__up up-header">
                    <div className="container">
                        <h1 className='demo'>Демонстрационный сайт</h1>
                        <div className="up-header__wrapper">
                            <div className="header__main">
                                <nav className="header__nav nav-header">
                                    <ul className="nav-header__list">
                                        <li className="nav-header__item">
                                            <Link to={"/about"} className="nav-header__link">
                                                О нас
                                            </Link>
                                        </li>
                                        <li className="nav-header__item">
                                            <Link to={"/payment"} className="nav-header__link">
                                                Оплата и доставка
                                            </Link>
                                        </li>
                                        <li className="nav-header__item">
                                            <Link 
                                                to={"/news"} className="nav-header__link">Новости
                                            </Link>
                                        </li>
                                        <li className="nav-header__item">
                                            <Link 
                                                to={"/contacts"}      className="nav-header__link">Контакты
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                                { user }
                                {/* { logoutBtn } */}
                                <a href="tel:81234567890" className="header__tel-sm">
                                    <svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.614 11.68L12.75 9.71a1.271 1.271 0 00-1.865 0l-.848.895a.963.963 0 01-1.412 0L4.95 6.724a1.096 1.096 0 010-1.491l.847-.895c.512-.54.52-1.42 0-1.969L3.933.407A1.271 1.271 0 002.07.406l-.68.71c-1.853 1.958-1.853 5.143 0 7.1l5.822 6.148c1.858 1.962 4.866 1.962 6.724 0l.678-.716a1.449 1.449 0 000-1.968zM2.69 1.063c.172-.18.45-.18.622 0l1.865 1.963a.482.482 0 010 .656l-.311.328L2.38 1.387l.31-.324zm5.143 12.645l-5.82-6.149C.577 6.045.498 3.668 1.77 2.054l2.477 2.615A2.061 2.061 0 004.33 7.38l3.674 3.882c.705.744 1.83.775 2.568.086l2.478 2.616c-1.524 1.34-3.771 1.269-5.216-.256zm6.16-.716l-.311.328-2.486-2.625.31-.328c.172-.18.45-.18.622 0l1.865 1.969a.483.483 0 010 .656z" fill="#fff"/></svg>
                                </a>
                                <Link to={"/favorites"} className="header__favorites-sm favorites">
                                    <svg width="28" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.1 0A7.917 7.917 0 0014 2.872 7.917 7.917 0 007.9 0C3.544 0 0 3.525 0 7.857c0 3.392 2.034 7.316 6.045 11.663 3.087 3.345 6.445 5.934 7.4 6.649l.555.414.554-.414c.956-.715 4.314-3.304 7.4-6.649C25.967 15.174 28 11.25 28 7.857 28 3.525 24.456 0 20.1 0zm.495 18.278c-2.54 2.751-5.27 4.975-6.595 6-1.325-1.025-4.056-3.249-6.595-6-3.637-3.94-5.559-7.544-5.559-10.42 0-3.32 2.716-6.022 6.054-6.022a6.063 6.063 0 015.293 3.108L14 6.392l.807-1.448A6.063 6.063 0 0120.1 1.836c3.338 0 6.054 2.701 6.054 6.021 0 2.877-1.922 6.48-5.56 10.421z" fill="#fff"/></svg>
                                    <span className="favorites-header__total-sm total">{ favorites ? favorites.length : 0 }</span>
                                </Link>
                                <Link to={ "/cort" } className="header__cort-sm cort-sm-header">
                                    <svg width="32" height="34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.13 7.769h22.582a1 1 0 01.969 1.248l-1.9 7.434a3 3 0 01-2.907 2.256H9.025M0 1.5h4.652a2 2 0 011.975 1.685l3.02 18.971a2 2 0 001.975 1.686h16.581m-12.434 6.424c0 1.302-1.01 2.31-2.2 2.31-1.188 0-2.199-1.008-2.199-2.31 0-1.303 1.01-2.31 2.2-2.31 1.188 0 2.199 1.007 2.199 2.31zm12.977 0c0 1.302-1.01 2.31-2.2 2.31-1.188 0-2.199-1.008-2.199-2.31 0-1.303 1.01-2.31 2.2-2.31 1.188 0 2.199 1.007 2.199 2.31z" stroke="#fff" strokeWidth="1.5"/></svg>
                                    <span className="cort-sm-header__total total">{ cort ? cort.length : 0 }</span>
                                </Link> 
                            </div>

                            {/* Burger */}
                            <div 
                                onClick={ handleOpenCloseBurger }
                                className="header__burger burger-header">
                                <span className="burger-header__line"></span>
                                <span className="burger-header__line"></span>
                                <span className="burger-header__line"></span>
                            </div>
                            <div 
                                style={triggerBurger ? { left: '0%', opacity: '1', visibility: 'visible' } : { left: "100%" }} 
                                className="header__burger-menu burger-menu-header">
                                <div className="burger-menu-header__wrapper">
                                    
                                    <span 
                                        onClick={ handleOpenCloseBurger }
                                        className="nav-burger__close close-nav">&#10006;
                                    </span>
                                    <nav
                                        ref={refBurgerMenu}
                                        style={triggerBurger ? { left: '0%', opacity: '1', visibility: 'visible' } : { left: "100%" }}  
                                        className="burger-menu-header__nav nav-burger">
                                        

                                        {/*LIST ORDER 0 */}
                                        <ul 
                                            
                                            data-order = "0"
                                            className="nav-burger__list burger-list">

                                            <li className="nav-burger__item item-nav">
                                                { user }
                                            </li>
                                            <li 
                                            onClick={ e => handleShiftFwdBurgerMenu(e) }
                                            data-related-to = "catalog"
                                            className="nav-burger__item nav-burger__item_next item-nav link-nav_next">
                                                Каталог товаров
                                            </li>
                                            <li className="nav-burger__item item-nav">
                                                <Link to={"/contacts"} className="nav-header__link">
                                                    Контакты
                                                </Link>
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "news"
                                                className="nav-burger__item nav-burger__item_next item-nav">
                                                <Link 
                                                    to={"/news"} className="nav-header__link">Новости
                                                </Link>
                                                
                                            </li>
                                            <li className="nav-burger__item item-nav">
                                                <Link to={"/payment"} className="nav-header__link">
                                                    Оплата и доставка
                                                </Link>
                                            </li>
                                            <li className="nav-burger__item item-nav">
                                                <Link to={"/about"} className="nav-header__link">
                                                    О нас
                                                </Link>
                                            </li>

                                        </ul>
                                        {/* /LIST ORDER 0 */}

                                        {/* LIST ORDER 1 */}
                                        <ul 
                                            className="nav-burger__list burger-list"
                                            data-order = "1"
                                            data-related-to='catalog'>
                                            <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "knives"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">
                                                Каталог ножей
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "blade"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">Клинковое оружие
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "souvenir"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">Сувенирные изделия
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "flashlights"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">Фонари ARMYTEK
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "accompany"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">Сопутствующие товары
                                            </li>
                                            <li 
                                                onClick={ e => handleShiftFwdBurgerMenu(e) }
                                                data-related-to = "hatchet"
                                                className="nav-burger__item nav-burger__item_next item-nav link-nav_next">Топоры
                                            </li>
                                        </ul>
                                        <ul 
                                            className="nav-burger__list burger-list"
                                            data-order = "1"
                                            data-related-to='news'>
                                            <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Новости' + i}</li>
                                            })}
                                        </ul>
                                        {/* /LIST ORDER 1 */}

                                        {/* LIST ORDER 2 */}
                                        
                                        <KnivesCatalog 
                                            classNames={
                                                {ul: "nav-burger__list burger-list", li: "nav-burger__item nav-burger__item_next item-nav"}
                                            }  
                                            dataAttributes = { 
                                                { 
                                                    dataRelatedTo: "knives",
                                                    dataOrder: "2"
                                                } 
                                            }
                                            callback = {handleShiftBwdBurgerMenu}
                                        />
                                        
                                        <ul 
                                            className="nav-burger__list burger-list" 
                                            data-order = "2"
                                            data-related-to='blade'>
                                            <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Клинок' + i}</li>
                                            })}
                                        </ul>
                                        <ul 
                                            className="nav-burger__list burger-list" 
                                            data-order = "2"
                                            data-related-to='souvenir'>
                                            <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Сувенир' + i}</li>
                                            })}
                                        </ul>
                                        <ul 
                                            className="nav-burger__list burger-list"
                                            data-order = "2"
                                            data-related-to='flashlights'>
                                                <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Фонари' + i}</li>
                                            })}
                                        </ul>
                                        <ul 
                                            className="nav-burger__list burger-list" 
                                            data-order = "2"
                                            data-related-to='accompany'>
                                                <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Сопутствующие' + i}</li>
                                            })}
                                        </ul>
                                        <ul 
                                            className="nav-burger__list burger-list"
                                            data-order = "2"
                                            data-related-to='hatchet'>
                                                <span 
                                                onClick={e => handleShiftBwdBurgerMenu(e) }
                                                className="nav-burger__back back-nav">Назад
                                            </span>
                                            {[...Array(5)].map((item, i) => {
                                                return <li key={i} className='nav-burger__item nav-burger__item_next item-nav'>{'Топоры' + i}</li>
                                            })}
                                        </ul>

                                        {/* /LIST ORDER 2 */}
                                    </nav>
                                </div>
                            </div>
                            {/* /Burger */}
                        </div>
                    </div>
                    
                </div>
                <div className="header__bottom">
                    <div className="container">
                        <div className="header__submain">
                            <Link to={"/"} className="header__logo"> 
                                <img src={logo} alt="logo" />
                            </Link>
                            <div className="header__search search-header">
                                <form 
                                    onSubmit={(e) => searchHandlerSubmit(e, searchVal)}
                                    className="header__form">
                                    <input 
                                        type="text" 
                                        name='search' 
                                        onChange={e => setSearchVal(e.target.value)}
                                        value={searchVal}
                                        className="search-header__input" 
                                        placeholder='Поиск'
                                        id="search" />
                                    { searchHelper }
                                </form>
                                
                            </div>
                            <div className="header__location">
                                Москва
                            </div>
                            <div className="header__recall recall-header">
                                <span className="recall-header__tel">9-999-999-99-99</span>
                                <a href="tel:88007774967" className="recall-header__link">Заказать звонок</a>
                                <img 
                                    ref = { refTel }
                                    src={ arrowBottom } 
                                    onClick={ handleRecall }
                                    className="recall-header__arrow"
                                    alt="open list of telephone numbers" />
                                <ul className="recall-header__list">
                                    <li className="recall-header__item">
                                        <a href="tel:88888888888" className="recall-header__link">8-888-888-88-88</a>
                                    </li>
                                    <li className="recall-header__item">
                                        <a href="tel:77777777777" className="recall-header__link">7-777-777-77-77</a>
                                    </li>
                                    <li className="recall-header__item">
                                        <a href="tel:66666666666" className="recall-header__link">6-666-666-66-66</a>
                                    </li>
                                    <li className="recall-header__item">
                                        <a href="tel:55555555555" className="recall-header__link">5-555-555-55-55</a>
                                    </li>
                                </ul>
                            </div>
                            <Link to={"/favorites"} className="header__favorites favorites-header">
                                <img src={favoritesImg} alt="favorites" />
                                <span className="favorites-header__total total">{ favorites ? favorites.length : 0 }</span>
                            </Link>
                            <div className="header__cort cort-header">
                                <div className="cort-header__img cort">
                                    <img src={cortImg} alt="cort" />
                                    <span className="cort-header__total total">{ cort ? cort.length : 0 }</span>
                                </div>
                                <div className="cort-header__order">
                                    <p className="cort-header__sum">{ totalSum === 0 ? getTotalSum(cort, goods) : totalSum } р.</p>
                                    <Link to={"/cort"} className="cort-header__link">Оформить заказ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </header>
    )
}
