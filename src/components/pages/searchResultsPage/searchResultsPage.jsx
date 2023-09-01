import React from 'react';
import { useSelector } from 'react-redux';

import { Slide } from '../../slide/Slide';

import './searchResultsPage.scss';

export const SearchResultsPage = () => {

    const { searchResult } = useSelector(state => state.authSlice);

    const renderFoundedItems = searchResult && searchResult.map(item => {
        return (
            <li key={item._id} className='search-results__item'>
                <Slide item = {item} />
            </li>
        )
    })

    return (
        <div className='search-results'>
            <h1 className="search-results__title">Результаты поиска:</h1>
            <ul className="search-results__list">
                { renderFoundedItems }
            </ul>
        </div>
    )
}
