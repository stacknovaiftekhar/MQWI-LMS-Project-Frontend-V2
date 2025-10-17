import axiosInstance from "../utilities/axiosInstance";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const useRemove = (endpoint, options = {}) => {
  const { onSuccess, onError } = options;
  const navigate = useNavigate();

  const handleRemove = async () => {
    const result = await Swal.fire({
      title: 'Are You Sure?',
      text: "You won't be able to Revert This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete It!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/${endpoint}`);
        toast.success('Entry Deleted Successfully');
        // Run Success Callback if Provided
        // if (onSuccess) onSuccess();
        if (onSuccess) {
          navigate(`/admin/contacts`, { state: { reload: true } });
        }
      } catch (error) {
        console.error('Delete Error:', error);
        toast.error('Failed to Delete the Entry');
        if (onError) onError(error);
      }
    }
  };

  return handleRemove;
};

export default useRemove;