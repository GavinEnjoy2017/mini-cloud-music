import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../core/Home';
import Recommend from '../core/Recommend';
import Singers from '../core/Singers';
import Rank from '../core/Rank';

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => {
                    <Redirect to={'/recommend'}></Redirect>
                }
            },
            {
                path: '/recommend',
                exact: true,
                component: Recommend
            },
            {
                path: '/singers',
                exact: true,
                component: Singers
            },
            {
                path: '/rank',
                exact: true,
                component: Rank
            }
        ]
    }
]