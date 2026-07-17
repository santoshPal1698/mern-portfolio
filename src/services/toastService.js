import { toast } from "react-toastify";

const commonStyle = {
  background: "#0d1f5c",
  color: "#e8eeff",
  border: "1px solid rgba(255,255,255,0.12)",
};

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  style: commonStyle,
};

const ToastService = {
  success: (message) => {
    toast.success(message, toastOptions);
  },

  error: (message) => {
    toast.error(message, toastOptions);
  },

  warning: (message) => {
    toast.warning(message, toastOptions);
  },

  info: (message) => {
    toast.info(message, toastOptions);
  },

  loading: (message) => {
    return toast.loading(message, toastOptions);
  },

  update: (id, message, type = "success") => {
    toast.update(id, {
      render: message,
      type,
      isLoading: false,
      autoClose: 3000,
    });
  },

  dismiss: () => {
    toast.dismiss();
  },
};

export default ToastService;