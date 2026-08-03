const USER_KEY = "USER";

const getUserData = () => {
    try {
      const userData = localStorage.getItem("USER");
      if (!userData) {
        return null;
      }
      return JSON.parse(userData);
    } catch (error) {
      return null;
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

const isSantoshPortfolio = (portfolioData) => {
  const intro = portfolioData?.intro;
  return (
    intro?.userId === "67f3a486a6ea9e899b516d3f" && intro?._id === "6715f4ab47cfc08664c6391a"
  );
};


export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Corrupt USER value in localStorage", err);
    return null;
  }
};
 
export const isLoggedIn = () => !!localStorage.getItem(USER_KEY);
 
export const setUser = (userObj) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
};
 
export const logout = () => {
  localStorage.removeItem(USER_KEY);
};
  
  export { getUserRole, hasSuperAdminRole, isAdminRole, setUserRole,getUserData, isSantoshPortfolio };
  