import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../../redux/comments/commentsSlice';

import './addComment.scss';

export const AddComment = ({setShowCommentForm, goodId}) => {

    const [textVal, setTextVal] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({text: textVal, goodId}));
        setTextVal('');
        setShowCommentForm(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className='add-comment'>
            <textarea 
                name="comment-text" 
                id="comment-text" 
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                cols="30" 
                rows="5"
                placeholder='Напишите свой отзыв' 
                className='add-comment__text'>
            </textarea>
            <button 
                onClick={() => setShowCommentForm(false)} 
                className="add-comment__btn add-comment__cancel">Отменить
            </button>
            <button 
                type='submit' 
                className="add-comment__btn add-comment__send">Отправить
            </button>
        </form>
    )
}
