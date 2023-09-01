import React from 'react';
import './catalog.scss';

export const Catalog = () => {
  return (
    <section className="catalog">
        <div className="container">
            <div className="catalog__wrapper">
                <ul className="catalog__list">
                    <li className="catalog__item catalog__item_1 item-catalog">
                        <h2 className="item-catalog__title">Каталог ножей</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                    <li className="catalog__item catalog__item_2 item-catalog">
                        <h2 className="item-catalog__title">Среднеклинковое оружие</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                    <li className="catalog__item catalog__item_3 item-catalog">
                        <h2 className="item-catalog__title">Длинноклинковое оружие</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                    <li className="catalog__item catalog__item_4 item-catalog">
                        <h2 className="item-catalog__title">Сувенирные изделия</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                    <li className="catalog__item catalog__item_5 item-catalog">
                        <h2 className="item-catalog__title">Сопутствующие товары</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                    <li className="catalog__item catalog__item_6 item-catalog">
                        <h2 className="item-catalog__title">Ножевая мастерская</h2>
                        <ul className="item-catalog__list">
                            <li className="item-catalog__elem">Разделочные</li>
                            <li className="item-catalog__elem">Туристические</li>
                            <li className="item-catalog__elem">Охотничьи</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}
