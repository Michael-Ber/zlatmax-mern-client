import React, { useState, useEffect } from 'react';

import { Spinner } from '../../spinner/Spinner';

import "./sendMail.scss";

export const SendMail = () => {

    //STATES

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const [btnName, setBtnName] = useState('Отправить');

    //USE EFFECT

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    //HANDLERS

    const handleSubmit = async(e) => {
        e.preventDefault();
        setBtnName(<Spinner userStyles={{width: '20px', height: '20x'}}/>)
        const resp = await fetch("https://zlatmax.onrender.com/send_mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('token'),
            },
            body: JSON.stringify({name, email, text})
        });
        
        const respJSON = await resp.json();
        setBtnName('Отправить');
        console.log(respJSON);
        setName('');
        setEmail('');
        setText('');
        return respJSON
    }

    const handleReset = () => {
        setName('');
        setEmail('');
        setText('');
    }

    return (
        <div className="container">
            <div className='sendMail'>
                <form onSubmit={e => handleSubmit(e)} className="sendMail__form">
                    <h1 className="sendMail__title">Отправьте нам сообщение</h1>
                    <label className='sendMail__label'>
                        Ваше имя: 
                        <input 
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type="text" 
                            name="name" 
                            id="name" 
                            className="sendMail__input" />
                    </label>
                    <label className='sendMail__label'>
                        Ваш email:
                        <input 
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text" 
                            name="email" 
                            id="email" 
                            className="sendMail__input" />
                    </label>
                    <label className='sendMail__label'>
                        Ваше сообщение:
                        <textarea 
                            onChange={e => setText(e.target.value)}
                            value={text}
                            name="message" 
                            id="message" 
                            cols="30" 
                            rows="10" 
                            className='sendMail__text'></textarea>
                    </label>
                    <div className="sendMail__btns">
                        <button type='submit' className="sendMail__submit">{btnName}</button>
                        <button onClick={handleReset} className="sendMail__cancel">Отмена</button>
                    </div>
                </form>
            </div>  
        </div>
        
    )
}
