import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Comment } from '../../comment/Comment';
import { Spinner } from '../../spinner/Spinner';

import { getComments } from '../../../redux/comments/commentsSlice';

import { AddComment } from '../../addComment/AddComment';

import { 
    addToCort,
    addToFavorites, 
    removeItemFromFavorites } from '../../../redux/goods/goodsSlice';

import { me, changeTotalSum } from '../../../redux/auth/authSlice';


import './cardDetail.scss';

export const CardDetail = () => {

    //STATES

    const [amountVal, setAmountVal] = useState(1);
    const [showCommentForm, setShowCommentForm] = useState(false);
    
    //SELECTORS

    const { goods, isLoading } = useSelector(state => state.goodsSlice);
    const cort = useSelector(state => state.authSlice.user?.cort)
    const { id } = useParams();
    const { comments } = useSelector(state => state.commentsSlice);
    const dispatch = useDispatch();


    //USE EFFECT

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id])

    //REFS
    const ref = useRef(null);
    const formRef = useRef(null);
    const starsWrapperRef = useRef(null);

    //STUFF
    const item = goods && goods.filter(elem => elem._id === id)[0]; 

    const stars = item && [...Array(item.rating)].map((elem, i) => {
        return <div key={i}  className="star-item" data-item-val={item.rating-i}>★</div>
    })
    const price = item && Number(item.price.replace(/\D/ig, '')) * ( amountVal ) + ' p.'

    //HANDLERS

    const handleForm = () => {
        const formdata = new FormData(formRef.current);
        const obj = {};
        formdata.forEach((val, key) => {
            obj[key] = val;
        })
        return obj;
    }

    const handleTab = (e) => {
        const tabBtn = e.target;
        const dataAttr = tabBtn.getAttribute('data-tab');
        const allTabBtns = document.querySelectorAll('.card-item__tab-btn');
        const allContents = document.querySelectorAll('.card-item__tab-content');
        const content = document.querySelector(`.card-item__tab-content[data-tab=${dataAttr}]`);
        
        allTabBtns.forEach(btn => btn.classList.remove('card-item__tab-btn_active'))
        allContents.forEach(cont => cont.classList.remove('card-item__tab-content_active'));

        tabBtn.classList.add('card-item__tab-btn_active');
        content.classList.add('card-item__tab-content_active');
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

    const handleClickCart = async(e) => {
        const btn = e.target.tagName === 'svg' ? e.target.parentNode : e.target.tagName === 'path' ? e.target.parentNode.parentNode : e.target;
        const sum = cort.reduce((sum, elem) => sum + (Number(elem.price.replace(/\D/ig, '')))*elem.amount, 0) + (Number(item.price.replace(/\D/ig, ''))*amountVal);
        if(!btn.disabled && window.localStorage.getItem('token')) {
            await dispatch(addToCort({goodId: item._id, additional: { amount: amountVal, ...handleForm() }}));
            await dispatch(me());
            dispatch(changeTotalSum(sum))
        }
        
    }
    

    const handleOnChangePlus = () => {
        setAmountVal(state => state + 1);
    }

    const handleOnChangeMinus = () => {
        setAmountVal(state => state > 1 ? state - 1: state);
    }

    const handleStarsRating = () => {
        const starNode = starsWrapperRef.current.children;
        const starArray = Array.from(starNode);
        console.log(starArray);
        starArray.forEach(item => {
            item.addEventListener('click', () => {
                const {itemVal} = item.dataset;
                starsWrapperRef.current.dataset.totalVal = itemVal;
            })
        });
    }

    //ADDITIONAL FUNCTIONS

    function modifiedReplyIdsToObjectsComments() {
        const recursy = (parentArr, childArr) => {
            if(childArr.length === 0) {
                return []
            }
            const arr = [];
            childArr.forEach(id => {
                const elem = parentArr.filter(item => item._id === id)
                arr.push(...elem);
            })

            return arr.map(item => {
                return {...item, reply: recursy(parentArr, item.reply)}
            })
        } 
        return deleteRepeatingItemsFromComments().map(comment => {
            return {...comment, reply: recursy(comments, comment.reply)}
        })
    }

    function deleteRepeatingItemsFromComments()  {

        const replies = comments.map(item => {
            return item.reply
        });
        const repliesDestructure = [].concat(...replies);
        const itemsToDeleteFromComments = [];
        repliesDestructure.forEach(item => {
            comments.forEach(elem => {
                if(elem._id === item) {
                    itemsToDeleteFromComments.push(elem);
                }
            })
        })
        const res = comments.filter(item => {
            return itemsToDeleteFromComments.indexOf(item) < 0;
        });
        
        return res
    }



    //RENDER ELEMENTS
    const renderComments = modifiedReplyIdsToObjectsComments() &&  
                modifiedReplyIdsToObjectsComments().length > 0 ?
                    modifiedReplyIdsToObjectsComments().map(comment => {
                        if(comment !== null) {
                            if(comment.reply.length > 0) {
                                return <Comment key={comment._id} comment = {comment} goodId={id} children={comment.reply}/>
                            }else {
                                return <Comment key={comment._id} comment = {comment} goodId={id} children={[]}/>
                            }
                        }
                        return null
                    }) : 
                    <li style={{fontSize: "22px", color: "gray", textAlign: "center"}}>Отзывов пока нет</li>

  return (
    item && <div className='cardDetail'> 
        <article className="card-item">
            <div className="container">
                <div className="card-item__header header-card-item">
                    <div className="header-card-item__links links-common">
                        <Link to={"/"} className="header-card-item__link link-common">Главная
                        </Link> {'>'}
                        <Link to={`/category/${item.category}`} className="header-card-item__link link-common">{item.categoryRU}
                        </Link> {'>'}
                        <span className="header-card-item__link header-card-item__link_active link-common link-common_active">{item.name}</span> 
                    </div>
                </div>
                <div className="card-item__content content-card-item">
                    <div className="content-card-item__left">
                        <div className="content-card-item__lg-img">
                            <img src={item.imgUrl} alt="card main"/>
                        </div>
                        <div className="content-card-item__sm-img">
                            <img src={item.imgUrl} alt="small"/>
                        </div>
                        <div className="content-card-item__sm-img">
                            <img src={item.imgUrl} alt="small"/>
                        </div>
                        <div className="content-card-item__sm-img">
                            <img src={item.imgUrl} alt="small"/>
                        </div>
                        <div className="content-card-item__sm-img">
                            <img src={item.imgUrl} alt="small"/>
                        </div>
                    </div>
                    <div className="content-card-item__right">
                        <div className="content-card-item__header header-content-card-item">
                            <div className="header-content-card-item__up">
                                <div className="header-content-card-item__left">
                                    <h2 className="header-content-card-item__name">{ item.name }</h2>
                                    <div 
                                        ref={starsWrapperRef}
                                        onClick={handleStarsRating}
                                        className="stars-wrapper" 
                                        data-total-val={item.rating}>
                                        {stars}
                                    </div>
                                </div>
                                <div className="header-content-card-item__right">
                                    <div 
                                        ref={ref} 
                                        onClick={e => handleClickFavorites(e)} className="header-content-card-item__link footer-slide__link">
                                        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.1004 0C17.7169 0 15.4856 1.07339 14 2.87184C12.5144 1.07333 10.2832 0 7.89957 0C3.54375 0 0 3.52462 0 7.85705C0 11.2495 2.03385 15.1734 6.04492 19.5198C9.13175 22.8646 12.4897 25.4544 13.4454 26.1685L13.9998 26.5828L14.5543 26.1686C15.5099 25.4545 18.868 22.8647 21.9549 19.52C25.9661 15.1736 28 11.2496 28 7.85705C28 3.52462 24.4562 0 20.1004 0ZM20.5948 18.2782C18.0558 21.0293 15.3242 23.2533 13.9998 24.2783C12.6755 23.2533 9.944 21.0293 7.40498 18.2781C3.76837 14.3375 1.84615 10.734 1.84615 7.85705C1.84615 4.53717 4.56172 1.83622 7.89957 1.83622C10.0961 1.83622 12.1243 3.02694 13.1927 4.94377L14 6.3923L14.8073 4.94377C15.8756 3.027 17.9038 1.83622 20.1004 1.83622C23.4383 1.83622 26.1538 4.53711 26.1538 7.85705C26.1538 10.7341 24.2316 14.3377 20.5948 18.2782Z" fill="black"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div 
                                style={item.available === "true" ? {color: "#24ad53"}: {color: "red"}} 
                                className="header-content-card-item__available">
                                { item.available === "true" ? "в наличии" : "нет в наличии" }
                            </div> 
                        </div>
                        <div className="content-card-item__descr descr-content-card-item">

                            <div className="descr-content-card-item__col descr-content-card-item__col_name">
                                <span>Артикул:</span>
                                <span>Торговая марка:</span>
                                <span>Серия:</span>
                                <span>Бонусные баллы:</span>
                            </div>

                            <div className="descr-content-card-item__col descr-content-card-item__col_val">
                                <span>AF0000001952</span>
                                <span>WUESTHOF (Германия)</span>
                                <span>Ножи серии classNameic Ikon</span>
                                <span>38</span>
                            </div>
                        </div>
                        <form 
                            ref={formRef} 
                            onSubmit={e => e.preventDefault()} 
                            className="content-card-item__selects selects-content-card-item">

                            <div className="selects-content-card-item__row">
                                <span>Сталь</span>
                                <div className="selects-content-card-item__wrapper">
                                    <select name="steel" id="steel" className="selects-content-card-item__select">
                                        <option value={"default"} className="selects-content-card-item__option">Выбрать сталь</option>
                                        <option value="100X13M" className="selects-content-card-item__option">100X13M</option>
                                        <option value="100X18M-ШД" className="selects-content-card-item__option">100X18M-ШД</option>
                                        <option value="40Х10С2М(ЭИ-107)" className="selects-content-card-item__option">40Х10С2М(ЭИ-107)</option>
                                        <option value="50Х14МФ" className="selects-content-card-item__option">50Х14МФ</option>
                                        <option value="95Х18" className="selects-content-card-item__option">95Х18</option>
                                        <option value="AUS-8" className="selects-content-card-item__option">AUS-8</option>
                                        <option value="ELMAX" className="selects-content-card-item__option">ELMAX</option>
                                        <option value="RWL-34" className="selects-content-card-item__option">RWL-34</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="selects-content-card-item__row">
                                <span>Рукоять</span>
                                <div className="selects-content-card-item__wrapper">
                                    <select name="handle" id="handle" className="selects-content-card-item__select">
                                        <option value={"default"}  className="selects-content-card-item__option">Выбрать рукоять</option>
                                        <option value="Рукоять-1" className="selects-content-card-item__option">Рукоять-1</option>
                                        <option value="Рукоять-2" className="selects-content-card-item__option">Рукоять-2</option>
                                        <option value="Рукоять-3" className="selects-content-card-item__option">Рукоять-3</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="selects-content-card-item__row">
                                <span>Гарда и тыльник</span>
                                <div className="selects-content-card-item__wrapper">
                                    <select name="guard" id="guard" className="selects-content-card-item__select">
                                        <option value={"default"}  className="selects-content-card-item__option">Выбрать гарда и тыльник</option>
                                        <option value="Гарда-1" className="selects-content-card-item__option">Гарда-1</option>
                                        <option value="Гарда-2" className="selects-content-card-item__option">Гарда-2</option>
                                        <option value="Гарда-3" className="selects-content-card-item__option">Гарда-3</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="selects-content-card-item__row">
                                <span>Обработка клинка</span>
                                <div className="selects-content-card-item__wrapper">
                                    <select name="handling" id="handling" className="selects-content-card-item__select">
                                        <option value={"default"}  className="selects-content-card-item__option">Выбрать обработку клинка</option>
                                        <option value="Обработка-1" className="selects-content-card-item__option">Обработка-1</option>
                                        <option value="Обработка-2" className="selects-content-card-item__option">Обработка-2</option>
                                        <option value="Обработка-3" className="selects-content-card-item__option">Обработка-3</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* <button onClick={testClick} type='submit'>submit</button> */}
                        </form>
                        <div className="content-card-item__order order-content-card-item">
                            <div className="order-content-card-item__up">
                                <p className="order-content-card-item__cost">{ price }</p>
                                <div className="order-content-card-item__score">+ 449 баллов за покупку 
                                    <span className="order-content-card-item__question-symbol">?</span>
                                    <p className="order-content-card-item__question-text">
                                        Вам будут начислены баллы в размере 5% 
                                        от стоимости покупки. Их можно будет использовать 
                                        на оплату последующих заказов.
                                    </p>
                                </div>
                            </div>
                            <div className="order-content-card-item__bottom">
                            <div className="order-content-card-item__count">
                                <button 
                                    onClick={handleOnChangeMinus}
                                    className="order-content-card-item__input-modify order-content-card-item__input-minus" aria-label="decrease choosed products">-</button>
                                <input 
                                    min="1"
                                    value={amountVal}
                                    onChange={e => setAmountVal(e.target.value)}  
                                    type="number" 
                                    className="order-content-card-item__input"/>
                                <button
                                    onClick={handleOnChangePlus} 
                                    className="order-content-card-item__input-modify order-content-card-item__input-plus" 
                                    aria-label="increase choosed products">+</button>
                            </div>
                                <button 
                                    onClick={e => handleClickCart(e)}
                                    disabled = {(cort && cort.filter(elem => elem._id === item._id).length > 0) ? true : false}
                                    className="order-content-card-item__btn-cort btn btn_sm">
                                        { isLoading ? <Spinner userStyles={{width: "20px"}}/> : <><span>В корзину</span> 
                                        <svg width="22" height="24" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.13008 7.76882H29.7121C30.3649 7.76882 30.8427 8.38411 30.681 9.01655L28.7801 16.4506C28.4405 17.7785 27.2442 18.7074 25.8736 18.7074H9.02537M0 1.49957H4.65214C5.63535 1.49957 6.47274 2.21422 6.62728 3.18521L9.6467 22.1562C9.80125 23.1272 10.6386 23.8418 11.6218 23.8418H28.203" stroke="#fff" strokeWidth="2.5"/>
                                        <path d="M15.7689 30.2656C15.7689 31.5678 14.7584 32.5758 13.5695 32.5758C12.3807 32.5758 11.3701 31.5678 11.3701 30.2656C11.3701 28.9634 12.3807 27.9554 13.5695 27.9554C14.7584 27.9554 15.7689 28.9634 15.7689 30.2656Z" stroke="#fff" strokeWidth="2.5"/>
                                        <path d="M28.746 30.2656C28.746 31.5678 27.7354 32.5758 26.5466 32.5758C25.3577 32.5758 24.3472 31.5678 24.3472 30.2656C24.3472 28.9634 25.3577 27.9554 26.5466 27.9554C27.7354 27.9554 28.746 28.9634 28.746 30.2656Z" stroke="#fff" strokeWidth="2.5"/>
                                        </svg> </>}
                                         
                                </button>
                                <div className="order-content-card-item__btn-oneclick btn btn_sm btn_black">Купить в 1 клик</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-item__tab">
                    <div className="card-item__tab-btns">
                        <button 
                        onClick={e => handleTab(e)}
                            data-tab="descr" 
                            className="card-item__tab-btn card-item__tab-btn_active" aria-label="description button">Описание
                        </button>
                        <button 
                        onClick={e => handleTab(e)}
                            data-tab="characteristics" 
                            className="card-item__tab-btn" 
                            aria-label="characteristics button">Характеристика
                        </button>
                        <button 
                        onClick={e => handleTab(e)}
                            data-tab="comments" 
                            className="card-item__tab-btn" 
                            aria-label="comments button">Отзывы
                        </button>
                        <button 
                        onClick={e => handleTab(e)}
                            data-tab="delivery" 
                            className="card-item__tab-btn" 
                            aria-label="delivery button">Доставка
                        </button>
                    </div>
                    <div className="card-item__tab-contents">
                        <div data-tab="descr" className="card-item__tab-content tab-content-card-item card-item__tab-content_active">
                            <div className="tab-content-card-item__wrapper-block">
                                <p className="tab-content-card-item__text">
                                    Легкий удобный нож с клинком, имеющим пологие вогнутые линзовидные спуски на две трети ширины клинка, образующие тонкое, 
                                    прекрасно режущее лезвие толщиной около 0,6 мм в районе подводов. 
                                </p>
                                <br/>
                                <p className="tab-content-card-item__text">
                                    Обух клинка со спинкой рукояти имеет одну плавную дугообразную линию. На пяте перед рукоятью есть подпальцевый вырез для точных работ. 
                                </p>
                                <br/>
                                <p className="tab-content-card-item__text">
                                    Необходимо проявлять некоторую осторожность при работе с большими боковыми нагрузками на лезвие ножа, ввиду небольшой толщины клинка 
                                    в рабочей части. 
                                </p>
                                <br/>
                                <p className="tab-content-card-item__text">
                                    Монтаж рукояти накладной плашечный. На навершии рукояти, функцию которого выполняет выступающий из под плашек хвостовик, 
                                    имеется отверстие под темляк. Этот нож удобный помощник при работе с продуктами и охоте на боровую и водоплавающую дичь.
                                </p>
                            </div>
                        </div>
                        <div data-tab="characteristics" className="card-item__tab-content tab-content-card-item">
                            <div className="tab-content-card-item__wrapper-flex">
                                <div className="tab-content-card-item__block tab-content-card-item__block_sm block-tab-content-card-item">
                                    <h3 className="block-tab-content-card-item__title">Технические характеристики</h3>
                                    <div className="block-tab-content-card-item__wrapper-main">
                                        <ul className="block-tab-content-card-item__wrapper-left">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Общая длина, мм:</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Длина клинка, мм:</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Ширина клинка, мм:</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Толщина обуха, мм:</span>
                                            </li>
                                        </ul>
                                        <ul className="block-tab-content-card-item__wrapper-right">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>227</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>112</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>24</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>2.9</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content-card-item__block tab-content-card-item__block_lg block-tab-content-card-item">
                                    <h3 className="block-tab-content-card-item__title">Используемые материалы</h3>
                                    <div className="block-tab-content-card-item__wrapper-main">
                                        <ul className="block-tab-content-card-item__wrapper-left">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Сталь:</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Рукоять:</span>
                                            </li>
                                        </ul>
                                        <ul className="block-tab-content-card-item__wrapper-right">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>95Х18</span>
                                            </li>
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Накладки карельская береза</span>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                                <div className="tab-content-card-item__block tab-content-card-item__block_lg block-tab-content-card-item">
                                    <h3 className="block-tab-content-card-item__title">Производство</h3>
                                    <div className="block-tab-content-card-item__wrapper-main">
                                        <ul className="block-tab-content-card-item__wrapper-left">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>Производство:</span>
                                            </li>
                                        </ul>
                                        <ul className="block-tab-content-card-item__wrapper-right">
                                            <li className="block-tab-content-card-item__elem">
                                                <span>АиР</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-tab="comments" className="card-item__tab-content tab-content-card-item">
                            <div className="tab-content-card-item__wrapper-block">
                                <div className="tab-content-card-item__no-comments no-comments-tab-content-card-item">
                                    <span className="no-comments-tab-content-card-item__text">У данного товара нет отзывов. Станьте первым, кто оставил отзыв об этом товаре!</span>
                                    <button className="no-comments-tab-content-card-item__btn btn btn_sm btn_black" aria-label="send comment">Написать отзыв</button>
                                </div>
                                <div className="tab-content-card-item__comments 
                                comments-tab-content-card-item">
                                    <button 
                                        onClick={() => setShowCommentForm(true)}        className="tab-content-card-item__writeMsg">
                                            Написать отзыв
                                    </button>

                                    { showCommentForm && <AddComment setShowCommentForm={setShowCommentForm} goodId={id}/>}

                                    <ul className="comments-tab-content-card-item__list">
                                        { renderComments }
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div data-tab="delivery" className="card-item__tab-content tab-content-card-item">
                            <div className="tab-content-card-item__wrapper-block">
                                <div className="tab-content-card-item__row">
                                    <span>Ваша страна</span>
                                    <select name="country" id="country" className="tab-content-card-item__select selects-content-card-item__select">
                                        <option value="ua" className="tab-content-card-item__option">Украина</option>
                                        <option value="uk" className="tab-content-card-item__option">Великобритания</option>
                                        <option value="us" className="tab-content-card-item__option">США</option>
                                        <option value="pol" className="tab-content-card-item__option">Польша</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="tab-content-card-item__row">
                                    <span>Ваш город</span>
                                    <select name="country" id="country" className="tab-content-card-item__select selects-content-card-item__select">
                                        <option disabled className="tab-content-card-item__option"></option>
                                        <option value="ua" className="tab-content-card-item__option">Киев</option>
                                        <option value="uk" className="tab-content-card-item__option">Лондон</option>
                                        <option value="us" className="tab-content-card-item__option">Вашингтон</option>
                                        <option value="pol" className="tab-content-card-item__option">Варшава</option>
                                    </select>
                                    <div className="selects-content-card-item__arrow">
                                        <svg width="12" height="17" viewBox="0 0 7 12" fill="#e8aa31" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.254211 1.74583L1.07917 0.920871L6.15832 6.00002L1.07917 11.0792L0.254211 10.2542L4.5084 6.00002L0.254211 1.74583Z" fill="e8aa31"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
        </article>
    </div>
  )
}
