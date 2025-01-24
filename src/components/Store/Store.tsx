import React, { useEffect, useState } from "react";
import styles from "./Store.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions, deleteProduct, getProducts } from "../../services/StoreSlice";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Store: React.FC = () => {
  const { productsData, loading } = useAppSelector(
    (state) => state.productPage.getProducts
  );
  const { modalOpen } = useAppSelector(
    (state) => state.productPage.deleteProduct
  );

  const [ deleteProductId, setDeleteProductId ] = useState<String | Number>('');
  console.log(productsData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleProductDelete = (id: String | Number) => {
        dispatch(deleteProduct(id));   
  };
  const handleModalOpen = (id: String | Number) => {
    dispatch(actions.setDeleteModal(true))
    setDeleteProductId((id))
  }

  return (
    <div className={styles.store}>
      {modalOpen && (
        <div className={styles.modalWindow}>
          <div className={styles.wrapper}>
            <h6>Do you really want to delete the product ?</h6>
            <div className={styles.btnWrapper}>
              <Button onClick={() => handleProductDelete(deleteProductId)} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Button onClick={() => dispatch(actions.setDeleteModal(false))} variant="outlined" color="error">Cancel</Button>
            </div>
          </div>
        </div>
      )}
      <h3>Store</h3>
      <div className={styles.filterBlock}>
        <div>Filter</div>
        <Button variant="outlined" onClick={() => navigate("/addProduct")}>
          Add product
        </Button>
      </div>
      <h4>List of product</h4>
      <div className={styles.productList}>
        {loading ? (
          <CircularProgress />
        ) : (
          productsData.map((p) => (
            <div className={styles.product} key={p.id}>
              <div
                className={styles.iconWrapper}
                onClick={() => handleModalOpen(p.id)}
              >
                <DeleteIcon />
              </div>
              <div className={styles.imgWrapper}>
                <img src={p.imageUrl} />
              </div>
              <div className={styles.name}>{p.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Store;
