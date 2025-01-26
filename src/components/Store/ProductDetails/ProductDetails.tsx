import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getOne } from "../../../services/StoreSlice";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, CircularProgress } from "@mui/material";

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error, data } = useAppSelector(
    (state) => state.productPage.getOne
  );
  const params = useParams();
  const { name, imageUrl, count, size, weight, comments } = data;

  useEffect(() => {
    if (params.id) {
      dispatch(getOne(params.id));
    }
  }, [params.id, dispatch]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className={styles.product}>
          <div className={styles.wrapper}>
            <div className={styles.detailsBlock}>
              <div className={styles.imgWrapper}>
                <img src={imageUrl} alt="product" />
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.name}>
                  {name}
                  <EditIcon
                    sx={{
                      fill: "white",
                      background: "black",
                      borderRadius: "3px",
                      marginLeft: "1rem",
                    }}
                  />
                </div>
                <div className={styles.count}>Product left: {count}</div>
                <div className={styles.width}>Width: {size?.width}</div>
                <div className={styles.height}>Height: {size?.height}</div>
                <div className={styles.weight}>Weight: {weight}</div>
              </div>
            </div>
            <div className={styles.commentsBlock}>
              <h2>Comments</h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  width: "1200px",
                }}
              >
                <Button variant="outlined">Add comment</Button>
              </Box>
              <div className={styles.commentsWrapper}>
                {comments?.map((c) => (
                  <div key={c.id} className={styles.comment}>
                    <div className={styles.description}>{c.description}</div>
                    <div className={styles.date}>{c.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
