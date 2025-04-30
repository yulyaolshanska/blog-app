import { toast } from 'react-toastify';

const notifyError = (message: string) => {
  toast.error(message, {
    className: 'notification',
    position: 'top-right'
  });
};

const notifySuccess = (message: string) => {
  toast.success(message, {
    className: 'notification',
    position: 'top-right'
  });
};

export { notifyError, notifySuccess };
