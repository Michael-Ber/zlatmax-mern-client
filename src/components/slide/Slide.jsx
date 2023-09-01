import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { me, changeTotalSum } from '../../redux/auth/authSlice';
import { addToCort, addToFavorites, removeItemFromFavorites } from '../../redux/goods/goodsSlice';

import { Spinner } from '../spinner/Spinner';

import '../pages/mainPage/bestsellers/bestsellers.scss';

export const Slide = ({item}) => {

    const cort = useSelector(state => {
        if(state.authSlice.user) {
            return state.authSlice.user.cort
        }
        return null
    });

    const { isLoading } = useSelector(state => state.goodsSlice)


    const ref = useRef(null);

    const favorites = useSelector(state => {
        if(state.authSlice.user) {
            return state.authSlice.user.favorites
        }
        return null
    });


    const dispatch = useDispatch();

    useEffect(() => {

        if(favorites) {
            favorites.forEach(id => {
                if(id === item._id) {
                    ref.current.classList.add('footer-slide__btn_active')
                }
            })
        }
    }, [])

    const handleClickCart = async(e) => {
        const btn = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target;
        const sum = cort && cort.reduce((sum, elem) => sum + (Number(elem.price.replace(/\D/ig, '')))*elem.amount, 0) + Number(item.price.replace(/\D/ig, '')); //item.amount did not used because item haven't got this property yet
        if(!btn.disabled && window.localStorage.getItem('token')) {
            await dispatch(addToCort({goodId: item._id}));
            await dispatch(me());
            await dispatch(changeTotalSum(sum))
        }
    }

    const handleClickFavorites = async(e) => {
        if(window.localStorage.getItem('token')) {
            if(ref.current.classList.contains('footer-slide__btn_active')) {
                ref.current.classList.remove('footer-slide__btn_active');
                await dispatch(removeItemFromFavorites({goodId: item._id}));
                await dispatch(me());
            }else {
                ref.current.classList.add('footer-slide__btn_active');
                await dispatch(addToFavorites({goodId: item._id}));
                await dispatch(me());
            }
        }  
    }


    const stars = [...Array(item.rating)].map((elem, i) => {
        return <div key={i} className="star-item" data-item-val={i+1}>★</div>
    })

    const defineDeclesion = (num, word) => {
        switch(num) {
            case 0: return word + 'ов';
            case 1: return word;
            case 2: return word + 'а';
            case 3: return word + 'а';
            case 4: return word + 'а';
            default: return word + 'ов'
        }
    }


    return (
    <>
        <Link to={`/card_detail/${item._id}`} className="card__img-link">
            <img src={item.imgUrl} alt="Card" />
        </Link>
        <Link to={`/card_detail/${item._id}`} className="card__name">{ item.name }</Link>
        <div className="card__info">
            <div className="card__descr">
                <span className="card__size">{ item.size }</span>
                <span className="card__material">{ item.color }</span>
            </div>
            <div className="card__rating">
                <div className="stars-wrapper" data-total-val={ item.rating }>
                    { stars }
                </div>
                <div className="card__comments">
                    <span>{item.comments.length}</span> {defineDeclesion(item.comments.length, 'отзыв')}  
                </div>
            </div>
            <div className="card__footer footer-slide">
                <span className="card__cost">2 719 р.</span>
                <div className="footer-slide__links">
                    <button 
                        ref={ref} 
                        onClick={e => handleClickFavorites(e)}
                        className="footer-slide__btn">
                        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1004 0C17.7169 0 15.4856 1.07339 14 2.87184C12.5144 1.07333 10.2832 0 7.89957 0C3.54375 0 0 3.52462 0 7.85705C0 11.2495 2.03385 15.1734 6.04492 19.5198C9.13175 22.8646 12.4897 25.4544 13.4454 26.1685L13.9998 26.5828L14.5543 26.1686C15.5099 25.4545 18.868 22.8647 21.9549 19.52C25.9661 15.1736 28 11.2496 28 7.85705C28 3.52462 24.4562 0 20.1004 0ZM20.5948 18.2782C18.0558 21.0293 15.3242 23.2533 13.9998 24.2783C12.6755 23.2533 9.944 21.0293 7.40498 18.2781C3.76837 14.3375 1.84615 10.734 1.84615 7.85705C1.84615 4.53717 4.56172 1.83622 7.89957 1.83622C10.0961 1.83622 12.1243 3.02694 13.1927 4.94377L14 6.3923L14.8073 4.94377C15.8756 3.027 17.9038 1.83622 20.1004 1.83622C23.4383 1.83622 26.1538 4.53711 26.1538 7.85705C26.1538 10.7341 24.2316 14.3377 20.5948 18.2782Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>
            <button
                onClick={e => handleClickCart(e)}
                disabled = { (cort && cort.filter(elem => elem._id === item._id).length > 0) ? true : false } 
                className="card__btn btn">{ isLoading ? <Spinner userStyles={{width: "20px"}}/> : <span>В корзину</span> }
            </button>
        </div>
    </>
    )
}
