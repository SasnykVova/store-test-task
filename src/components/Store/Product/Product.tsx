import React from "react";
import styles from "./Product.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductProps {
  id: string | number;
  imageUrl: string;
  name: string;
  onClick: (event: React.MouseEvent, id: string | number) => void;
  onOpenProduct: (id: string | number) => void
}

const Product: React.FC<ProductProps> = ({ id, imageUrl, name, onClick, onOpenProduct }) => {
  return (
    <div onClick={() => onOpenProduct(id)} className={styles.product}>
      <div className={styles.iconWrapper} onClick={(event) => {
        event.stopPropagation();
        onClick(event, id)
        }}>
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
