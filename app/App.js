import React from 'react';
import styles from './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';

const App = () => (
  <div className={styles.app}>
    <Header />
    <Content />
    <Footer />
  </div>
    );

export default App;
