import React, { useEffect } from "react";
import styles from "./AddProduct.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actions, addProduct } from "../../../services/StoreSlice";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading,
    success,
    error,
    name,
    imageUrl,
    count,
    width,
    height,
    weight,
  } = useAppSelector((state) => state.productPage.addProduct);
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    if (
      name &&
      imageUrl &&
      count !== null &&
      width !== null &&
      height !== null &&
      weight
    ) {
      dispatch(addProduct({ name, imageUrl, count, width, height, weight }));
      dispatch(actions.resetProduct())
    }
  };

  useEffect(() => {
    if(success) {
      navigate('/')
      dispatch(actions.setAddProductSuccess())
    }
  }, [success])

  return (
    <div className={styles.addProduct}>
      <h2>AddProduct</h2>
      <div className={styles.inputsBlock}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => dispatch(actions.setName(e.target.value))}
        />
        <TextField
          id="outlined-basic"
          label="ImageUrl"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => dispatch(actions.setImageUrl(e.target.value))}
        />
        <TextField
          id="outlined-basic"
          label="Count"
          variant="outlined"
          value={count}
          onChange={(e) => dispatch(actions.setCount(Number(e.target.value)))}
        />
        <TextField
          id="outlined-basic"
          label="Width"
          variant="outlined"
          value={width}
          onChange={(e) => dispatch(actions.setWidth(Number(e.target.value)))}
        />
        <TextField
          id="outlined-basic"
          label="Height"
          variant="outlined"
          value={height}
          onChange={(e) => dispatch(actions.setHeight(Number(e.target.value)))}
        />
        <TextField
          id="outlined-basic"
          label="Weight"
          variant="outlined"
          value={weight}
          onChange={(e) => dispatch(actions.setWeight(e.target.value))}
        />
      </div>
      <div className={styles.btnBlock}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddProduct}
          disabled={
            !name ||
            !imageUrl ||
            count === null ||
            width === null ||
            height === null ||
            !weight
          }
        >
          {loading ? <CircularProgress/> : 'Create'}
        </Button>
        <Button variant="contained" color="error" onClick={() => navigate("/")}>
          Сancel
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
