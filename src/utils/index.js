import Swal from "sweetalert2";

//  成功提示
export const successSwal = ({ title, text = "", confirmButtonText = "確認" } = {}) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: true,
    confirmButtonText,
    buttonsStyling: false,
    customClass: {
      confirmButton: "swal-btn btn-success",
      popup: "swal-popup",
    },
  });
};

//  錯誤提示
export const errorSwal = ({
  title,
  text = "",
  confirmButtonText = "確認",
  cancelButtonText = "關閉",
  showCancelButton = true,
} = {}) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    showCancelButton,
    reverseButtons: true,
    confirmButtonText,
    cancelButtonText,
    iconColor: "#ff0000",
    buttonsStyling: false,
    customClass: {
      cancelButton: "swal-btn btn-danger",
      confirmButton: "swal-btn btn-success",
      popup: "swal-popup",
      icon: "swal-error-icon",
    },
  });
};

//  警告提示
export const warningSwal = ({
  title,
  text = "",
  confirmButtonText = "確認",
  cancelButtonText = "關閉",
  showCancelButton = true,
  showConfirmButton = true,
} = {}) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton,
    showConfirmButton,
    cancelButtonText,
    confirmButtonText,
    iconColor: "#ff7700",
    buttonsStyling: false,
    customClass: {
      cancelButton: "swal-btn btn-info",
      confirmButton: "swal-btn btn-danger",
      popup: "swal-popup",
      icon: "swal-warning-icon",
    },
  });
};
