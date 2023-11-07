import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, setShowModal } from '../../../redux/auth/authSlice';



import './loginPage.scss';

export const LoginPage = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authSlice);
    const nav = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = { username: name, password };
        await dispatch(login(data));
        await dispatch(setShowModal(true));
        setName('');
        setPassword('');
    }

    useEffect(() => {
        if (user) {
            nav("/");
        }
    }, [user, nav])

    return (
        <div className='login'>
            <h1 className="login__title">Логин</h1>
            <div className="login__register">
                <h3>Нет аккаунта? </h3>
                <Link to="/register" className='login__link'>Зарегистрироваться</Link>
            </div>
            <form onSubmit={(e) => submitHandler(e)} className="login__form">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder='Введите имя'
                    name='username'
                    className="login__input" />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder='Введите пароль'
                    name='password'
                    className="login__input" />
                <Button style={{ marginTop: "50px" }} btnText={'Войти'} />
            </form>

        </div>
    )
}
