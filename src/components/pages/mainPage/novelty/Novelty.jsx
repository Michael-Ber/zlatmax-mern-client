import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Slide } from '../../../slide/Slide';

import { setProcess } from '../../../../utils/setProcess';

import './novelty.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




export const Novelty = () => {

const { goods, process } = useSelector(state => state.goodsSlice);

const goodsToRender = goods.slice(7, 12).map(item => {
    const stars = [...Array(item.rating)].map((elem, i) => {
        return <div key={i} className="star-item" data-item-val={i+1}>★</div>
    })
    return (
        <SwiperSlide key={item._id} className="slider-novelty__slide slide-novelty__card card card_height">
            <Slide item={item} stars={stars}/>
        </SwiperSlide>

    )
})
  return (
    <section className="novelty">
        <div className="container">
            <div className="novelty__wrapper">
                <div className="novelty__content content-novelty">
                    <h2 className="content-novelty__title section-title">Новинки</h2>
                    <p className="content-novelty__text">Добро пожаловать на официальный сайт «ЗЛАТМАКС»! В нашем магазине представлен наиболее широкий выбор Златоустовских ножей от Златоустовских Оружейных Фабрик и компаний, мы являемся официальными поставщиками.</p>
                    <Link to={"/catalog/novelty"} className="content-novelty__more link-more">Больше новинок</Link>
                </div>
                { setProcess({FulfilledComponent: <Slider goodsToRender={goodsToRender} />, process}) }
            </div>
        </div>
    </section>
  )
}

const Slider = ({goodsToRender}) => {   
    return (
        <div className="novelty__slider slider-novelty">
            <Swiper 
            navigation
            slideClass='slider-novelty__slide'
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={ 
                {
                320: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 2,
                },
                1610: {
                    slidesPerView: 3,
                }
                }
            }
            
            className="slider-novelty__wrapper">
                { goodsToRender }
                <div className="slider-novelty__pagination pagination-slider-novelty"></div>
            </Swiper>
        </div>
    )
}
