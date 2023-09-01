import React from 'react';
import { Link } from 'react-router-dom';
import './articles.scss';

import knives from '../../../../assets/img/main/about-knives.jpg';
import flashlight from '../../../../assets/img/main/choose-flashlight.jpg';
import kitchen from '../../../../assets/img/main/kitchen-knives.jpg';
import another from '../../../../assets/img/main/another-knives.jpg';



export const Articles = () => {
  return (
    <section className="articles">
        <div className="container">
            <h2 className="articles__title section-title">Наши статьи</h2>
            <ul className="articles__list">
                <li className="articles__item">
                    <article className="articles__card card-articles">
                        <div className="card-articles__img">
                            <img src={ knives } alt='knives'/>
                        </div>
                        <div className="card-articles__contain">
                            <Link to={"/"} className="card-articles__link">Все о ножах: как правильно выбрать</Link>
                            <p className="card-articles__date">24.07.2019</p>
                        </div>
                    </article>
                </li>
                <li className="articles__item">
                    <article className="articles__card card-articles">
                        <div className="card-articles__img">
                            <img src={ flashlight } alt="choose flashlight"/>
                        </div>
                        <div className="card-articles__contain">
                            <Link to={"/flashlight"} className="card-articles__link">Как правильно выбрать фонарь</Link>
                            <p className="card-articles__date">24.07.2019</p>
                        </div>
                    </article>
                </li>
                <li className="articles__item">
                    <article className="articles__card card-articles">
                        <div className="card-articles__img">
                            <img src={ kitchen } alt="kitchen knives"/>
                        </div>
                        <div className="card-articles__contain">
                            <Link to={"/"} className="card-articles__link">Кухонные ножи для хозяек</Link>
                            <p className="card-articles__date">24.07.2019</p>
                        </div>
                    </article>
                </li>
                <li className="articles__item">
                    <article className="articles__card card-articles">
                        <div className="card-articles__img">
                            <img src={ another } alt="another knives"/>
                        </div>
                        <div className="card-articles__contain">
                            <Link to={"/"} className="card-articles__link">Кухонные ножи для хозяек</Link>
                            <p className="card-articles__date">24.07.2019</p>
                        </div>
                    </article>
                </li>
                
                
                <li className="articles__item articles__item_wide articles__item_bg1">
                    <article className="articles__card card-articles">
                        <div className="card-articles__descr">
                            <p className="card-articles__big-title">Тактические фонари</p>
                            <p className="card-articles__text">Lorem ipsum dolor sit amet, 
                                consectetur adipiscing elit.
                            </p>
                            <Link to={"/flashlight"} className="btn btn_md card-articles__btn">Подробнее</Link>
                        </div>
                    </article>
                </li>
                <li className="articles__item articles__item_wide articles__item_bg2">
                    <article className="articles__card card-articles">
                        <div className="card-articles__descr">
                            <p className="card-articles__big-title">Налобные мультифонари</p>
                            <p className="card-articles__text">Lorem ipsum dolor sit amet, 
                                consectetur adipiscing elit.
                            </p>
                            <Link to={"/flashlight"} className="card-articles__btn btn btn_md">Подробнее</Link>
                        </div>
                    </article>
                </li>
            </ul>
        </div>
    </section>
  )
}
