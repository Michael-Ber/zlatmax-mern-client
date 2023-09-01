import React, { useState } from 'react';
import { removeItemFromCart, removeItemFromOrder } from '../../redux/goods/goodsSlice';
import { me, changeItemAmount, changeTotalSum } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import remove from '../../assets/icons/catalog/trash.png';

export const ControlledCard = ({ item, stars }) => {

    const [amount, setAmount] = useState(item.amount ? item.amount : 1);
    const cort = useSelector(state => state.authSlice.user?.cort);
    const dispatch = useDispatch();


    const handleOnChangePlus = async() => {
        setAmount(state => state + 1);
        await dispatch(changeItemAmount( { id: item._id, amount: amount + 1 } ));
    }
    const handleOnChangeMinus = async() => {
        setAmount(state => state > 1 ? state - 1: state);
        await dispatch(changeItemAmount( { id: item._id, amount: amount > 1 ? amount - 1 : amount } ));
    }

    const deleteHandler = async() => {
        try {
            const sum = cort.reduce((sum, elem) => sum + (Number(elem.price.replace(/\D/ig, '')))*elem.amount, 0) - Number(item.price.replace(/\D/ig, '')) * item.amount;
            await dispatch(removeItemFromCart({goodId: item._id}));
            await dispatch(removeItemFromOrder({id: item._id}));
            await dispatch(me());
            await dispatch(changeTotalSum(sum));
        } catch (error) {
            console.log(error);
        }
    }

        
    return (
        <li className="cart__item item-cart">
            <div className="item-cart__wrapper">
                <div className="item-cart__img">
                <img src={item.imgUrl} alt={item.name} />
                </div>
                <div className="item-cart__descr">
                <h1 className="item-cart__name">{ item.name }</h1>
                <div className="item-cart__info">
                    <span>{ item.size }</span>
                    <span>{ item.color }</span>
                </div>
                <div className="item-cart__rate">
                    <div className="item-cart__stars stars-wrapper" data-total-val={item.rating}>
                    {stars}
                    </div>
                    <div className="item-cart__recall">12 отзывов</div>
                </div>
                <div className="item-cart__price">
                    <span className="item-cart__cost">Цена: { Number(item.price.replace(/\D/ig, '')) * amount } р.</span> 
                    <div className="item-cart__amount-wrapper">
                        <span>Кол-во</span>
                        <div className="item-cart__amount-subwrapper">
                            <div 
                            onClick={handleOnChangeMinus} 
                            className="item-cart__minus">
                                <span></span>
                            </div>
                            <div 
                                onClick={handleOnChangePlus} 
                                className="item-cart__plus">
                                    <span></span>
                            </div>
                            <input 
                                type='number'
                                disabled
                                className="item-cart__amount" 
                                value = { amount } />
                        </div>
                    </div>      
                    <div 
                        onClick={deleteHandler}
                        className="item-cart__delete">
                    <img src={ remove } alt="delete" />
                    </div>
                </div>
                </div>
            </div>
        </li>
    )
}
