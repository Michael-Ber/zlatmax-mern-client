import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddComment } from '../addComment/AddComment';
import { AddReply } from '../addReply/AddReply';

import { getComments, addComment, removeComment } from '../../redux/comments/commentsSlice';

import Moment from 'react-moment';

import remove from './remove.svg';

export const Comment = ({comment, goodId, children}) => {

    const [showReplyForm, setShowReplyForm] = useState(false); 

    const { user, token } = useSelector(state => state.authSlice)
    const dispatch = useDispatch();

    const removeCommentHandler = async() => {
        await dispatch(removeComment({commentId: [comment._id].concat(comment.reply.map(item => item._id)), goodId}));
        await dispatch(getComments(goodId))
    }


    const stylesForDeleteBtn = (token === window.localStorage.getItem('token') && user.username === comment.name) ? {display: 'block'} : {display: 'none'}


  return (
    <li className="comments-tab-content-card-item__elem">
        <div className="comments-tab-content-card-item__left">
            <div className="comments-tab-content-card-item__avatar">
                <span>{comment.name.slice(0, 2).toUpperCase()}</span>
            </div>
        </div>
        <div className="comments-tab-content-card-item__right">
            <div className="comments-tab-content-card-item__subwrapper">
                <h3 className="comments-tab-content-card-item__name">{comment.name}</h3>
                <span className="comments-tab-content-card-item__date">
                    <Moment format='DD.MM.YYYY hh:mm:ss' interval={0}>{comment.createdAt}</Moment>
                </span>
            </div>
            <p className="comments-tab-content-card-item__text">
                { comment.text }
            </p>
            <div className="comments-tab-content-card-item__favorite">
                <button 
                    onClick={() => setShowReplyForm(true)} 
                    className="comments-tab-content-card-item__answer" aria-label="answer button">Ответить
                </button>
                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <div className="comments-tab-content-card-item__favorites footer-slide__link">
                        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1004 0C17.7169 0 15.4856 1.07339 14 2.87184C12.5144 1.07333 10.2832 0 7.89957 0C3.54375 0 0 3.52462 0 7.85705C0 11.2495 2.03385 15.1734 6.04492 19.5198C9.13175 22.8646 12.4897 25.4544 13.4454 26.1685L13.9998 26.5828L14.5543 26.1686C15.5099 25.4545 18.868 22.8647 21.9549 19.52C25.9661 15.1736 28 11.2496 28 7.85705C28 3.52462 24.4562 0 20.1004 0ZM20.5948 18.2782C18.0558 21.0293 15.3242 23.2533 13.9998 24.2783C12.6755 23.2533 9.944 21.0293 7.40498 18.2781C3.76837 14.3375 1.84615 10.734 1.84615 7.85705C1.84615 4.53717 4.56172 1.83622 7.89957 1.83622C10.0961 1.83622 12.1243 3.02694 13.1927 4.94377L14 6.3923L14.8073 4.94377C15.8756 3.027 17.9038 1.83622 20.1004 1.83622C23.4383 1.83622 26.1538 4.53711 26.1538 7.85705C26.1538 10.7341 24.2316 14.3377 20.5948 18.2782Z" fill="black"/>
                        </svg>
                    </div>
                    <div 
                        style={stylesForDeleteBtn}
                        onClick={removeCommentHandler}
                        className="comments-tab-content-card-item__remove">
                        <img src={remove} alt="remove" />
                    </div>
                </div>
                

            </div>
            { showReplyForm && <AddReply isReply={true} goodId={goodId} setShowReplyForm={setShowReplyForm} commentId={comment._id} /> }

            
            <ul className="comments-tab-content-card-item__list">
                { children.map(comment => <Comment key={comment._id} comment = {comment} goodId={goodId} children={comment.reply}/>) }
            </ul>
            
        </div>
    </li>
  )
}
