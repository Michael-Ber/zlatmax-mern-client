import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import { Catalog } from './catalog/Catalog';
import { Bestsellers } from './bestsellers/Bestsellers';
import { Novelty } from './novelty/Novelty';
import { Articles } from './articles/Articles';
import { KnivesCatalog } from '../../catalog/knivesCatalog/KnivesCatalog';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './mainPage.scss';
import knives from '../../../assets/img/main/knives.png';

export const MainPage = () => {

    const [activeTab, setActiveTab] = useState('');

    const onEnterHandler = (e) => {
        const allTabs = document.querySelectorAll('.content-tab-main');
        const content = e.target.nextElementSibling;
        allTabs.forEach(cont => {
            cont.style.zIndex = '-1';
        })
        content.style.zIndex = '1000';
        setActiveTab(content.getAttribute('data-tab'));
    }

    const onLeaveHandler = (e) => {
        setActiveTab('');
        document.querySelector(`.contents-tab-main__content[data-tab=${activeTab}]`).style.zIndex = '-1';
    }


return (
    <>
        <section className="main">
            {/* <!-- TABS=============================================================== --> */}
            <div className="main__tab tab-main">
                <div className="tab-main__btns btns-tab-main">
                    <div className="container">
                        <ul className="btns-tab-main__list">
                            <li 
                                onMouseEnter={(e) => onEnterHandler(e)} 
                                data-tab="knives" 
                                className="btns-tab-main__item ">
                                    Каталог ножей
                            </li>
                            <div onMouseLeave={(e) => onLeaveHandler(e)} data-tab="knives" className="contents-tab-main__content content-tab-main">
                                <div className="content-tab-main__wrapper">
                                    <ul className="content-tab-main__list">
                                        <li className="content-tab-main__item item-content-main">
                                            Категория ножей
                                        </li>
                                        <li className="content-tab-main__item item-content-main">
                                            Производство ножей
                                        </li>
                                        <li className="content-tab-main__item item-content-main">
                                            Ножи по маркам стали
                                        </li>
                                        <li className="content-tab-main__item item-content-main">
                                            Заточка и полировка ножей
                                        </li>
                                        <li className="content-tab-main__item item-content-main">
                                            Ножевая мастерская
                                        </li>
                                    </ul>
                                    <ul className="content-tab-main__catalog catalog-tab-main">
                                        <li className="catalog-tab-main__item item-catalog">
                                            <KnivesCatalog classNames={{ul: "item-catalog__list", li: "item-catalog__link"}} />
                                        </li>
                                        <li className="catalog-tab-main__item item-catalog">
                                            
                                            <KnivesCatalog classNames={{ul: "item-catalog__list", li: "item-catalog__link"}} />
                                        </li>
                                        <li className="catalog-tab-main__item item-catalog">
                                            
                                            <KnivesCatalog classNames={{ul: "item-catalog__list", li: "item-catalog__link"}} />
                                            
                                        </li>
                                        <li className="catalog-tab-main__item item-catalog">
                                            
                                            <KnivesCatalog classNames={{ul: "item-catalog__list", li: "item-catalog__link"}} />
                                            
                                        </li>
                                        <li className="catalog-tab-main__item item-catalog">
                                            
                                            <KnivesCatalog classNames={{ul: "item-catalog__list", li: "item-catalog__link"}} />
                                            
                                        </li>
                                    </ul>
                                </div>
                                <ul className="content-tab-main__all all-content">
                                    <li><Link to={"/category/all"} className="all-content__link">Смотреть все</Link></li>
                                    <li><Link to={"/category/all"} className="all-content__link">Смотреть все</Link></li>
                                    <li><Link to={"/category/all"} className="all-content__link">Смотреть все</Link></li>
                                    <li><Link to={"/category/all"} className="all-content__link">Смотреть все</Link></li>
                                    <li><Link to={"/category/all"} className="all-content__link">Смотреть все</Link></li>
                                </ul>
                            </div>
                            <li onMouseEnter={(e) => onEnterHandler(e)} data-tab="blade" className="btns-tab-main__item">Клинковое оружие</li>
                            <div onMouseLeave={(e) => onLeaveHandler(e)} data-tab="blade" className="contents-tab-main__content content-tab-main">Content-2</div>
                            <li onMouseEnter={(e) => onEnterHandler(e)} data-tab="souvenir" className="btns-tab-main__item">Сувенирные изделия</li>
                            <div onMouseLeave={(e) => onLeaveHandler(e)} data-tab="souvenir" className="contents-tab-main__content content-tab-main">Content-3</div>
                            <li onMouseEnter={(e) => onEnterHandler(e)} data-tab="armytek" className="btns-tab-main__item">Фонари ARMYTEK</li>
                            <div onMouseLeave={(e) => onLeaveHandler(e)} data-tab="armytek" className="contents-tab-main__content content-tab-main">Content-4</div>
                            <li onMouseEnter={(e) => onEnterHandler(e)} data-tab="related" className="btns-tab-main__item">Сопуствующие товары</li>
                            <div onMouseLeave={(e) => onLeaveHandler(e)} data-tab="related" className="contents-tab-main__content content-tab-main">Content-5</div>
                        </ul>
                    </div>
                </div>
                
            </div>
            {/* <!-- /TABS=============================================================== --> */}

            {/* <!-- SLIDER============================================================= --> */}
            <div className="main__container container-main">
                    <div className="container">
                        <div className="main__wrapper">
                            <div className="main__container-inner">
                                <div className="main__carousel carousel-common">
                                    <Swiper 
                                        navigation
                                        slideClass='carousel-main__slide'
                                        slideActiveClass='carousel-main__slide_active'
                                        modules={[Pagination, Navigation]}
                                        pagination={{ clickable: true }}
                                        slidesPerView={1}
                                        onSwiper={(swiper) => {
                                            const sliderLength = swiper.slides.length;
                                            const activeFraction = document.querySelector('.carousel-main__current');
                                            const allFraction = document.querySelector('.carousel-main__total');
                                            const fractionWrapper = document.querySelector('.carousel-main__fraction');

                                            sliderLength < 10 ? activeFraction.innerHTML = `0`+ (swiper.activeIndex + 1) : activeFraction.innerHTML = swiper.activeIndex;
                                            allFraction.innerHTML = sliderLength;
                                            fractionWrapper.style.left = `${sliderLength * 40}px`;
                                        }}
                                        onSlideChange={(swiper) => {
                                            const sliderLength = swiper.slides.length;
                                            const activeFraction = document.querySelector('.carousel-main__current');
                                            sliderLength < 10 ? activeFraction.innerHTML = `0`+ (swiper.activeIndex + 1) : activeFraction.innerHTML = swiper.activeIndex;
                                        }}  
                                        className="carousel-main__wrapper wrapper-common">

                                        <SwiperSlide className="carousel-main__slide carousel-main__slide_active slide-main">
                                            <h2 className="carousel-main__title">Интернет магазин сертифицированных</h2>
                                            <h3 className="carousel-main__subtitle">златоустовских ножей</h3>
                                            <p className="carousel-main__text text-tab">
                                                Добро пожаловать на официальный сайт «ЗЛАТМАКС»! В нашем магазине 
                                                представлен наиболее широкий выбор Златоустовских ножей от Златоустовских 
                                                Оружейных Фабрик и компаний, мы являемся официальными поставщиками.
                                            </p>
                                            <div className="slide-main__wrapper wrapper-slide">
                                                <Link to={"/about"} className="btn btn_sm carousel-main__btn">Подробнее</Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide  className="carousel-main__slide slide-main">
                                            <h2 className="carousel-main__title">Title-2</h2>
                                            <h3 className="carousel-main__subtitle">Subtitle-2</h3>
                                            <p className="carousel-main__text">
                                                Text-2
                                            </p>
                                            <div className="slide-main__wrapper">
                                                <Link to={"/about"} className="btn btn_sm carousel-main__btn">Подробнее</Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="carousel-main__slide slide-main">
                                            <h2 className="carousel-main__title">Title-3</h2>
                                            <h3 className="carousel-main__subtitle">Subtitle-3</h3>
                                            <p className="carousel-main__text">
                                                Text-3
                                            </p>
                                            <div className="slide-main__wrapper">
                                                <Link to={"/about"} className="btn btn_sm carousel-main__btn">Подробнее</Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="carousel-main__slide slide-main">
                                            <h2 className="carousel-main__title">Title-4</h2>
                                            <h3 className="carousel-main__subtitle">Subtitle-4</h3>
                                            <p className="carousel-main__text">
                                                Text-4
                                            </p>
                                            <div className="slide-main__wrapper">
                                                <Link to={"/about"} className="btn btn_sm carousel-main__btn">Подробнее</Link>
                                            </div>
                                        </SwiperSlide>
                                        
                                        <div className="carousel-main__pagination  pagination-slider-common">

                                        </div>
                                        <div className="carousel-main__fraction">
                                            <span className="carousel-main__current"></span>
                                            / 
                                            <span className="carousel-main__total"></span>
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="container-main__img">
                                <img src={ knives } alt="knives" />
                                <div className="container-main__tipps tipps-container-main">
                                    <div className="tipps-container-main__item tipps-container-main__item_1"><span>+</span></div>
                                    <div className="tipps-container-main__item tipps-container-main__item_2"><span>+</span></div>
                                    <div className="tipps-container-main__item tipps-container-main__item_3"><span>+</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="main__benefits benefits-main">
                            <ul className="benefits-main__list">
                                <li className="benefits-main__item benefits-main__item_garanty">Гарантия 100% возврата 
                                    денежных средств</li>
                                <li className="benefits-main__item benefits-main__item_delivery">Доставка по России, 
                                    Казахстану и Белоруссии</li>
                                <li className="benefits-main__item benefits-main__item_order">Возможность оформление 
                                    заказа без регистрации.</li>
                                <li className="benefits-main__item benefits-main__item_discount">Скидки постоянным 
                                    покупателям. </li>
                            </ul>
                        </div>
                    </div>
                
            </div>
            {/* <!-- /SLIDER============================================================= --> */}
        </section>
        <Catalog />
        <Bestsellers />
        <Novelty />
        <Articles />
    </>
    

)
}
