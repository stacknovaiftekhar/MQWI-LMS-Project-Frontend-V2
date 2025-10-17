import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const SignOut = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // prevents multiple toasts

  useEffect(() => {
    if (!hasLoggedOut.current) {
      hasLoggedOut.current = true;
      // Option-1: Clear Authentication Data from LocalStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      // Option-2: Clear All LocalStorage
      // localStorage.clear(); // ✅ Clear everything on logout

      toast.success("You have been Logged Out.");
      navigate("/signin");
    }
  }, [navigate]);

  return null; // or a loader/spinner if you prefer
};

export default SignOut;