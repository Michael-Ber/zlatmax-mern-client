import React, { useEffect, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setShowModal, resetingMessage as resetingMsgAuth } from '../../redux/auth/authSlice';
import { resetingMessage as resetingMsgGoods } from '../../redux/goods/goodsSlice';
import './modal.scss';

export const Modal = memo(({ showModal, message }) => {
  const dispatch = useDispatch();

  const styles = showModal ?
    { visibility: 'visible', top: '50%', transform: 'translate(-50%, -50%)' } :
    { visibility: 'hidden', top: '0', transform: 'translate(-50%, -100%)' };

  const closeModal = useCallback(() => {
    dispatch(setShowModal(false));
    dispatch(resetingMsgAuth());
    dispatch(resetingMsgGoods());
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 10000)
    return () => clearTimeout(timer);
  }, [showModal, closeModal])



  const renderMsg = message.length > 0 && message.map(msg => {

    return msg !== '' && msg
  })

  console.log(message, renderMsg)

  return (
    <div style={styles} className='modal'>
      <p className="modal__message">{renderMsg}</p>
      <div onClick={closeModal} className="modal__close">x</div>
    </div>
  )
})
