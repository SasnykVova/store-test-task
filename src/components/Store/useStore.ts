import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions, deleteProduct, getProducts } from "../../services/StoreSlice";
import { SelectChangeEvent } from "@mui/material";

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
  const handleModalOpen = (event: React.MouseEvent, id: String | Number) => {
    event.stopPropagation();
    dispatch(actions.setDeleteModal(true));
    setDeleteProductId(id);
  };

  const [filter, setFilter] = useState<string>("");
  
    const handleChangeSelect = (event: SelectChangeEvent) => {
      setFilter(event.target.value as string);
    };

    const sortedProducts = [...productsData].sort((a, b) => {
      switch (filter) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "count-desc":
          return b.count - a.count;
        case "count-asc":
          return a.count - b.count;
        case 'def':
          return 0
        default:
          return 0;
      }
    });

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
    filter,
    handleChangeSelect,
    sortedProducts
  };
};
