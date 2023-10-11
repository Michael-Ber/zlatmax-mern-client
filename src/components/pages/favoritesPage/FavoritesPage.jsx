import React from 'react';
import { useSelector } from 'react-redux';

import { Slide } from '../../slide/Slide';

import './favoritesPage.scss'; 

export const FavoritesPage = () => {

    const favoritesArr = useSelector(state => state.authSlice.user?.favorites);
    const  goods  = useSelector(state => state.goodsSlice.goods);

    const renderItems = favoritesArr && favoritesArr.map(id => {
        const item = goods.filter(elem => elem._id === id)[0];
        return (
            <li key={id} className="page-favorites__item page-category__item">
                <Slide item = {item} />
            </li>
        )
    })

    return (
        <div className='page-favorites page-category'>
            <h1 className="page-favorites__title page-category__title">Избранное</h1>
            <ul className="page-favorites__list page-category__list">
                { renderItems }
            </ul>
        </div>
    )
}
