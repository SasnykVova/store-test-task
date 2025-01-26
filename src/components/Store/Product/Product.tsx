import React from "react";
import styles from "./Product.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductProps {
  id: string | number;
  imageUrl: string;
  name: string;
  onClick: (id: string | number) => void;
}

const Product: React.FC<ProductProps> = ({ id, imageUrl, name, onClick }) => {
  return (
    <div className={styles.product}>
      <div className={styles.iconWrapper} onClick={() => onClick(id)}>
        <DeleteIcon />
      </div>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default Product;
