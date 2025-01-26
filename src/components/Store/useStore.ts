import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions, deleteProduct, getProducts } from "../../services/StoreSlice";

export const useStore = () => {
  const { productsData, loading } = useAppSelector(
    (state) => state.productPage.getProducts
  );
  const { modalOpen, loading: loadingDelete } = useAppSelector(
    (state) => state.productPage.deleteProduct
  );

  const dispatch = useAppDispatch();

  const [deleteProductId, setDeleteProductId] = useState<String | Number>("");

  const handleProductDelete = (id: String | Number) => {
    dispatch(deleteProduct(id));
  };
  const handleModalOpen = (id: String | Number) => {
    dispatch(actions.setDeleteModal(true));
    setDeleteProductId(id);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return {
    productsData,
    loading,
    modalOpen,
    loadingDelete,
    dispatch,
    deleteProductId,
    handleProductDelete,
    handleModalOpen,
  };
};
