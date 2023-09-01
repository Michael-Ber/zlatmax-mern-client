import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const KnivesCatalog = ({classNames, dataAttributes, callback}) => {

    const goods = useSelector(state => state.goodsSlice.goods);
    const backBtn = callback && <span onClick={e => callback(e) }className="nav-burger__back back-nav">Назад</span>

    const removeDublicateObjects = ( arr ) => {
        const categoryArr = Array.from(new Set(arr.map(item => item.category)));
        const categoryArrRu = Array.from(new Set(arr.map(item => item.categoryRU)));
        const res = [];
        if(categoryArr.length === categoryArrRu.length) {
            for(let i = 0; i < categoryArr.length; i++) {
                res.push([categoryArr[i], categoryArrRu[i]])
            }
        }
        return res
    }
    const dataRelatedTo = (dataAttributes && dataAttributes.dataRelatedTo) ? dataAttributes.dataRelatedTo : null;
    const dataOrder = (dataAttributes && dataAttributes.dataOrder) ? dataAttributes.dataOrder : null;
    const renderLiItems = goods && removeDublicateObjects(goods).map((item, i) => {
        return (
            <li key={goods[i]._id} className='nav-burger__item nav-burger__item_next item-nav'>
                <Link to={`/category/${item[0]}`} className={classNames.li}> 
                    { item[1] }
                </Link>
            </li>
        )
    })

    return (
        <ul className={classNames.ul} data-related-to={dataRelatedTo} data-order = {dataOrder}>
            { backBtn }
            { renderLiItems }
        </ul>
    )
}
