import React, { useEffect } from 'react';
import styles from './Store.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProducts } from '../../services/StoreSlice';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Store: React.FC = () => {

    const { productsData, loading } = useAppSelector((state => state.productPage.getProducts));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();




    useEffect(() => {
        dispatch(getProducts())
    },[])

    return (
        <div className={styles.store}>
            <h3>Store</h3>
            <div className={styles.filterBlock}>
                <div>Filter</div>
                <Button variant="outlined" onClick={() => navigate('/addProduct')}>Add product</Button>
            </div>
            <h4>List of product</h4>
            <div className={styles.productList}>
                {loading 
                ? 
                <CircularProgress />
                :
                productsData.map(p => 
                <div className={styles.product} key={p.id}>
                    <img className={styles.img} src={p.imageUrl}/>
                    <div className={styles.name}>{p.name}</div>
                </div>)}
            </div>
        </div>
    );
}

export default Store;
