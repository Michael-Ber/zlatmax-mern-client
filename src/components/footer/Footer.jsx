import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

import bg from '../../assets/img/main/footer-bg.jpg';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__upper upper-footer">
                <div className="upper-footer__img">
                    <img src={bg} alt="" />
                </div>
                <div className="footer__bottom">
                    <div className="container">
                        <h2 className="upper-footer__title">Златоустовские ножи интернет-магазин "ЗЛАТМАКС"</h2>
                        <p className="upper-footer__text">Наш интернет-магазин "ЗЛАТМАКС" предлагает Вам ножи очень высокого качества из города оружейников - Златоуста. Златоустовские ножи известны и популярны среди потребителей как на российским рынке, так и за рубежом: ножи охотничьи, хозяйственные, туристические, рыбацкие, складные и метательные. Нож Златоуста - это идеальный друг и товарищ в повседневной жизни и в экстремальных ситуациях. На многую продукцию распространяется гарантия до 10 лет - это один из главных показателей качества. Для Вас на нашем сайте "zlatmax" предложен огромный ассортимент Златоустовских ножей. Наши менеджеры помогут определиться и подобрать самый лучший Златоустовский нож, ориентируясь на Ваши пожелания.</p>
                    </div>
                </div>
            </div>
            <div className="footer__wrapper-outer">
                <div className="container">
                    <div className="footer__wrapper-inner">
                        <div className="footer__block block-footer">
                            <ul className="block-footer__list list-block block-footer__list_1">
                                <span className="list-block__title"> ИНФОРМАЦИЯ </span>
                                <li className="block-footer__item"><Link to={"/"}
                                    className="block-footer__link">Златоустовские ножи
                                    в Москве и Московской
                                    области</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Ножевые стали</Link></li>
                                <li className="block-footer__item"><Link to={"/about"} className="block-footer__link">О нас</Link></li>
                                <li className="block-footer__item"><Link to={"/payment"} className="block-footer__link">Условия оплаты
                                    и доставки</Link></li>
                                <li className="block-footer__item"><Link to={"/rules"} className="block-footer__link">Политика
                                    конфиденциальности</Link></li>
                            </ul>
                            <ul className="block-footer__list list-block block-footer__list_2">
                                <span className="list-block__title"> СЛУЖБА ПОДДЕРЖКИ </span>
                                <li className="block-footer__item"><Link to={"/contacts"} className="block-footer__link">Контактная информация</Link></li>
                                <li className="block-footer__item"><Link to={"/payment"} className="block-footer__link">Возврат товара</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Карта сайта</Link></li>
                            </ul>
                            <ul className="block-footer__list list-block block-footer__list_3">
                                <span className="list-block__title"> ДОПОЛНИТЕЛЬНО </span>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Подарочные сертификаты</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Партнеры</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Товары со скидкой</Link></li>
                            </ul>
                            <ul className="block-footer__list list-block  block-footer__list_4">
                                <span className="list-block__title"> ЛИЧНЫЙ КАБИНЕТ </span>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Личный кабинет</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">История заказов</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Мои закладки</Link></li>
                                <li className="block-footer__item"><Link to={"/"} className="block-footer__link">Рассылка новостей</Link></li>
                            </ul>
                            {/* <!-- HR ===================================== --> */}
                            <hr />
                            {/* <!-- /HR======================================= --> */}
                            <ul className="block-footer__list list-block  block-footer__list_5">
                                <span className="list-block__title"> КОНТАКТЫ </span>
                                <li className="block-footer__item"><Link to={"tel:88888888888"} className="block-footer__link block-footer__link_tel">8 (888) 888-88-88</Link></li>
                                <li className="block-footer__item block-footer__link_schedule">
                                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" stroke="#fff" /><rect width="1" height="5" rx=".5" transform="matrix(-1 0 0 1 8 4)" fill="#fff" /><rect width="1" height="4" rx=".5" transform="matrix(0 1 1 0 7 8)" fill="#fff" /></svg>
                                    Пн-Пт 7:00 - 16:00 (МСК)</li>
                                <li className="block-footer__item block-footer__link_location">
                                    <svg width="17" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 0C3.813 0 0 3.85 0 8.584c0 1.6.439 3.16 1.269 4.514L8.016 24.08c.13.21.357.338.602.338h.006a.707.707 0 00.602-.348L15.8 12.983A8.64 8.64 0 0017 8.584C17 3.851 13.187 0 8.5 0zm6.085 12.248l-5.978 10.08-6.134-9.984a7.197 7.197 0 01-1.066-3.76c0-3.944 3.187-7.163 7.093-7.163s7.088 3.219 7.088 7.163a7.2 7.2 0 01-1.003 3.664z" fill="#fff" /><path d="M8.496 3.617c-2.603 0-4.722 2.029-4.722 4.522 0 2.477 2.084 4.522 4.722 4.522 2.671 0 4.723-2.072 4.723-4.522 0-2.493-2.119-4.522-4.723-4.522zm0 7.547c-1.745 0-3.158-1.359-3.158-3.025 0-1.662 1.423-3.024 3.158-3.024 1.736 0 3.154 1.362 3.154 3.024 0 1.642-1.38 3.025-3.154 3.025z" fill="#fff" /></svg>
                                    Златоуст,
                                    <p>ул. Шоссейная,</p>
                                    <p>д. 1, офис «6Б»</p>
                                </li>
                                <li className="block-footer__item"><Link to={"/send_mail"} className="block-footer__link block-footer__link_mail">test@test.com</Link></li>
                                <li className="block-footer__item item-block block-footer__socials block-footer__socials_disable320">
                                    <ul className="item-block__socials socials-item-block">
                                        <li><Link to={"https://facebook.com"} className="socials-item-block__link link-socials__facebook"></Link></li>
                                        <li><Link to={"https://viber.com"} className="socials-item-block__link link-socials__viber"></Link></li>
                                        <li><Link to={"https://telegram.com"} className="socials-item-block__link link-socials__telegram"></Link></li>
                                        <li><Link to={"https://whatsapp.com"} className="socials-item-block__link link-socials__whatsapp"></Link></li>
                                    </ul>
                                </li>

                            </ul>
                            <ul className="block-footer__list list-block  block-footer__list_6">
                                <span className="list-block__title"> ПОЛЕЗНЫЕ ССЫЛКИ </span>
                                <li className="block-footer__item"><Link to={"/payment"} className="block-footer__link">Способы оплаты и доставки</Link></li>
                            </ul>
                            <ul className="block-footer__list list-block  block-footer__list_7">
                                <span className="list-block__title"> НАША ГАРАНТИЯ </span>
                                <li className="block-footer__item">Недовольны своей покупкой?
                                    Вы можете вернуть ее в течении
                                    30 дней с даты получения,
                                    согласно <Link to={"/rules"} className="block-footer__rules">нашим правилам</Link>
                                </li>
                            </ul>
                            <ul className="block-footer__list list-block block-footer__list_w375  block-footer__list_8">
                                <span className="list-block__title"> НОВОСТНАЯ РАССЫЛКА </span>
                                <li className="block-footer__item item-block">
                                    Подпишитесь прямо сейчас!
                                    <form action="#">
                                        <div className="item-block__input-wrapper">
                                            <input type="text" placeholder="example@gmail.com" className="block-footer__subscribe" />
                                            <button
                                                type="submit"
                                                className="item-block__btn"
                                                aria-label="subscribe button">
                                                <svg width="16" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.113 9.23L.325 2.009a1.23 1.23 0 010-1.664 1.06 1.06 0 011.563 0l6.007 6.392L13.902.345a1.06 1.06 0 011.563 0 1.23 1.23 0 010 1.663L8.677 9.231c-.216.23-.5.344-.782.344a1.07 1.07 0 01-.782-.344z" fill="#fff" /></svg>
                                            </button>
                                        </div>
                                        <label htmlFor="agree" className="block-footer__label">
                                            <span>Я прочитал Условия соглашения и согласен с условиями</span>
                                            <input required type="checkbox" id="agree" className="block-footer__agree" />
                                        </label>
                                    </form>
                                </li>
                                <li className="block-footer__item item-block block-footer__socials block-footer__socials_enable320">
                                    <ul className="item-block__socials socials-item-block">
                                        <li><Link to={"https://facebook.com"} className="socials-item-block__link link-socials__facebook"></Link></li>
                                        <li><Link to={"https://viber.com"} className="socials-item-block__link link-socials__viber"></Link></li>
                                        <li><Link to={"https://telegram.com"} className="socials-item-block__link link-socials__telegram"></Link></li>
                                        <li><Link to={"https://whatsapp.com"} className="socials-item-block__link link-socials__whatsapp"></Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__block block-footer footer__block_bottom">
                            <div className="block-footer__rights">
                                <p> Все материалы, размещенные на сайте, носят справочный характер и не являются </p>
                                <p> публичной офертой, определяемойположениями Статьи 437 Гражданского кодекса Российской Федерации. </p>
                                <p> При копировании материалов гиперссылка на www.zlatmax.ru обязательна!</p>
                            </div>
                            <p className="block-footer__site">Златоустовские ножи www.zlatmax.ru &#169;</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
