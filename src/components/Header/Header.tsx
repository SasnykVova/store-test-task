import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>Logo</div>
            {/* <nav>
                <ul>
                    <NavLink to='/store'>Store</NavLink>
                    <NavLink to='/delivery'>Delivery</NavLink>
                    <NavLink to='contact'>Contact</NavLink>
                </ul>
            </nav> */}
        </div>
    );
}

export default Header;
