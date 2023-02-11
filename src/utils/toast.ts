import { toast, ToastOptions } from 'react-toastify';

// Default toast options
const toastOptions: ToastOptions = {
  theme: 'colored',
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  draggable: true,
  closeOnClick: true,
};

type MessageType = string | React.ReactNode;
type ToastTypesType = 'info' | 'success' | 'warning' | 'error';

const { info, success, warn: warning, error } = toast;
const toastVariants = {
  info,
  success,
  warning,
  error,
};

const showToast = (
  message: MessageType,
  type: ToastTypesType = 'info',
  options: ToastOptions = {}
) => toastVariants[type](message, { ...toastOptions, ...options });

export default showToast;
