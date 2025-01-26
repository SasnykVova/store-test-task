import React from "react";
import styles from "./ConfirmModal.module.scss";
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ConfirmModalPros {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  loading: boolean;
}

const ConfirmModal: React.FC<ConfirmModalPros> = ({
  loading,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.modalWindow}>
      <div className={styles.wrapper}>
        <h6>{message}</h6>
        <div className={styles.btnWrapper}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                onClick={onConfirm}
                variant="outlined"
                startIcon={<DeleteIcon/>}
              >
                {loading ? (
                  <CircularProgress sx={{ width: "100%" }} />
                ) : (
                  "Delete"
                )}
              </Button>
              <Button
                onClick={onCancel}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
