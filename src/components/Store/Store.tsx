import React from "react";
import styles from "./Store.module.scss";
import { actions } from "../../services/StoreSlice";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Product from "./Product/Product";
import ConfirmModal from "../ui/ConfirmModal/ConfirmModal";
import { useStore } from "./useStore";

const Store: React.FC = () => {
  const {
    productsData,
    loading,
    modalOpen,
    loadingDelete,
    deleteProductId,
    dispatch,
    handleProductDelete,
    handleModalOpen,
  } = useStore();

  const navigate = useNavigate();

  return (
    <div className={styles.store}>
      {modalOpen && (
        <ConfirmModal
          loading={loadingDelete}
          onConfirm={() => handleProductDelete(deleteProductId)}
          onCancel={() => dispatch(actions.setDeleteModal(false))}
          message="Do you really want to delete the product ?"
        />
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
          productsData.map(({ id, imageUrl, name }) => (
            <Product
              key={id}
              id={id}
              imageUrl={imageUrl}
              name={name}
              onClick={handleModalOpen}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Store;
