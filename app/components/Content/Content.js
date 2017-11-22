import React from 'react';
import styles from './Content.css';

export const Content = () => (
  <div className={styles.content}>
      <img height={250} resizemode={'contain'} src="./assets/Dad Cockpit.jpg" />
      <img height={250} resizemode={'contain'} src="./assets/sandman.jpg" />
      <img height={250} resizemode={'contain'} src="./assets/Dad p-47.jpg" />
  </div>
);

export default Content;
