import { Outlet } from 'react-router-dom';

import { Header } from '../header/Header';
import styles from '../../styles/common.module.css';

export const Layout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
