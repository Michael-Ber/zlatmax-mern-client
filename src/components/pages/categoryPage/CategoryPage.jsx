import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Slide } from '../../slide/Slide';

import './categoryPage.scss';

export const CategoryPage = () => { 
    const { categoryName } = useParams();
    const goods = useSelector(state => state.goodsSlice.goods);
    const categoryGoods = goods && goods.filter(item => categoryName !== 'all' ? item.category === categoryName : item);
    const categoryNameRU = ( categoryGoods && categoryName !== 'all' ) ? categoryGoods[0].categoryRU : "Все категории ножей";

    const renderCategoryItems = categoryGoods && categoryGoods.map(item => {
        return (
            <li key={item._id} className="page-category__item">
                <Slide item = { item }/>
            </li>
        )
    })
    return (
        <div className='page-category'>
            <h1 className="page-category__title">{ categoryNameRU }</h1>
            <ul className="page-category__list">
                { renderCategoryItems }
            </ul>
        </div>
    )
}
