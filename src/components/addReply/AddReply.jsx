import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getComments, addComment } from '../../redux/comments/commentsSlice';


export const AddReply = ({setShowReplyForm, commentId, isReply, goodId}) => {

    const [textVal, setTextVal] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addComment({text: textVal, commentId, isReply, goodId }));
        await dispatch(getComments(goodId));
        setTextVal('');
        setShowReplyForm(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className='add-comment'>
            <textarea 
                name="reply-text" 
                id="reply-text" 
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                cols="30" 
                rows="5"
                placeholder='Напишите свой отзыв' 
                className='add-comment__text'>
            </textarea>
            <button 
                onClick={() => setShowReplyForm(false)} 
                className="add-comment__btn add-comment__cancel">Отменить
            </button>
            <button 
                type='submit' 
                className="add-comment__btn add-comment__send">Отправить
            </button>
        </form>
    )
}