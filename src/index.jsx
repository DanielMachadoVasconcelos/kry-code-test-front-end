import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { StoreProvider } from "easy-peasy";

import { App } from './app/Index';
import { store} from "@/_services";

render(
    <StoreProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('app')
);