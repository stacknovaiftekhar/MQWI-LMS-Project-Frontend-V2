import axiosInstance from "../utilities/axiosInstance";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const useDelete = (endpoint, setData, options = {}) => {
  const { onSuccess, onError } = options;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are You Sure?',
      text: "You won't be able to Revert This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete It!',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/${endpoint}/${id}/`);
      toast.success('Entry Deleted Successfully');

      // if (setData) { setData((prev) => prev.filter((item) => item.id !== id)); }
      if (setData) { setData((prev) => Array.isArray(prev) ? prev.filter((item) => item.id !== id) : []); }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error('Failed to Delete the Entry');
      if (onError) onError(error);
    }
  };

  return handleDelete;
};

export default useDelete;