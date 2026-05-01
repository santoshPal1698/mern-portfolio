
const getUserData = () => {
    try {
      const userData = localStorage.getItem("USER");
  
      if (!userData) {
        // Return null if no user data is found
        return null;
      }
  
      // Parse and return the complete user data object
      return JSON.parse(userData);
    } catch (error) {
      // console.error("Error fetching user data from localStorage:", error);
      return null; // Return null on error
    }
  };

const getUserRole = () => {
    try {
      const userData = localStorage.getItem("USER");
  
      if (!userData) {
        return null;
      }
        
      const parsedUserData = JSON.parse(userData);
      const role = parsedUserData?.userData?.data?.roles || "GUEST";
      return role;
    } catch (error) {
      // console.error("Error fetching user role from localStorage:", error);
      return null; // Return null on error
    }
  };



  
  const hasSuperAdminRole = () => {
    return getUserRole() === "SUPER_ADMIN_SPTECH";
  };
  
  const isAdminRole = () => {
    return getUserRole() === "ADMIN";
  };
  
  // To set/update user data (if needed)
  const setUserRole = (userData) => {
    try {
      localStorage.setItem("USER", JSON.stringify(userData));
    } catch (error) {
      // console.error("Error setting user data in localStorage:", error);
    }
  };
  
  export { getUserRole, hasSuperAdminRole, isAdminRole, setUserRole,getUserData };
  