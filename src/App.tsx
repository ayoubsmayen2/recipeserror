import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';

import Container from '@material-ui/core/Container';

import { CategoryMenu } from './components/layout/category-menu/CategoryMenu';
import { Footer } from './components/layout/footer/Footer';
import { Search } from './components/layout/search/Search';
import { TopBar } from './components/layout/topbar/TopBar';
import { Routes as Content, history } from './routes';
import { store } from './store';

export const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <TopBar />
      <Container maxWidth="md" className="app-container">
        <CategoryMenu />
        <Search placeholder="Search Recipes..." />
        <Content />
      </Container>
      <Footer />
    </ConnectedRouter>
  </Provider>
);
