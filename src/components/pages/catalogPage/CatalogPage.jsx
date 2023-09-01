import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Slide } from '../../slide/Slide';

import "./catalogPage.scss";

export const CatalogPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { catalogName } = useParams();
    const { goods } = useSelector(state => state.goodsSlice);
    const goodsByCatalog = goods && goods.filter(item => item.additional === catalogName);

    const catalogRU = {
        "novelty": "Новинки",
        "bestseller": "Хиты продаж"
    };

    const goodsToRender = goodsByCatalog.map(item => {
        return (
            <li key={item._id} className="page-category__item page-category__item">
                <Slide item = { item }/>
            </li>
        )
    })

    return (
        <div className='page-catalog page-category'>
            <h1 className="page-catalog__title page-category__title">{ catalogRU[catalogName] }</h1>
            <ul className="page-catalog__list page-category__list">
                { goodsToRender }
            </ul>
        </div>
    )
}
 