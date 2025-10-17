import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useSignOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    toast.success("You have been Logged Out.");
    navigate("/signin");
  };

  return handleLogout;
};

export default useSignOut;