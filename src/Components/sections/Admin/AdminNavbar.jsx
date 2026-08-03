import React, { useState, useEffect, useRef } from "react";
import { Link as LinkR, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MenuRounded } from "@mui/icons-material";
import { getUser, hasSuperAdminRole } from "../../../services/AuthService";
import ToastService from "../../../services/toastService";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 76px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const NavbarContainer = styled.div`
  width: 100%;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  font-weight: 600;
  font-size: 22px;
  text-decoration: none;
  color: blue;
`;

const AdminLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const AdminLink = styled(LinkR)`
  color: ${({ theme, $active }) =>
    $active ? theme.primary : theme.text_primary};
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;

  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 28px 24px;
  margin: 0;
  background: ${({ theme }) => theme.bgLight + 99};
  position: absolute;
  top: 76px;
  left: 0;
  right: 0;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? 1000 : -1000)};
  transition: all 0.4s ease-in-out;
`;

const ProfileArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const WelcomeText = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 52px;
  right: 0;
  min-width: 190px;
  background: ${({ theme }) => theme.card || theme.bg};
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  z-index: 20;
`;

const DropdownHeader = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_secondary || theme.text_primary};
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: rgba(133, 76, 230, 0.12);
  }
`;

// Everything this navbar needs to know about admin links, in one place.
const ADMIN_LINKS = [
  { label: "Bio-Profile", to: "/admin/user-profile" },
  { label: "Projects", to: "/admin/project-form" },
  { label: "Education", to: "/admin/education-form" },
  { label: "Experience", to: "/admin/experience-form" },
  { label: "Skills", to: "/admin/all-skills-form" },
];

const USER_KEY = "USER";
const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUserState] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getUser();
    // console.log("currentuser data", currentUser);
    if (!currentUser) {
      navigate("/login", { replace: true, state: { from: location } });
      setUserState(null);
      setCheckedAuth(true);
      return;
    }

    setUserState(currentUser.userData?.data);
    setCheckedAuth(true);
  }, [location.pathname]);

  useEffect(() => {
    const syncAcrossTabs = () => setUserState(getUser());
    window.addEventListener("storage", syncAcrossTabs);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", syncAcrossTabs);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUserState(null);
    setProfileOpen(false);
    setIsOpen(false);
    ToastService.error("Logout was Successful??");
    navigate("/login", { replace: true });
  };

  const goToProfile = () => {
    setProfileOpen(false);
    setIsOpen(false);
    navigate("/admin/user-profile");
  };

  // Nothing to show yet (auth check in progress) or already bounced to /login.
  if (!checkedAuth || !user) return null;

  const initials = user?.firstName
    ? user.firstName.trim().charAt(0).toUpperCase()
    : "A";

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>SUPER_ADMIN_SPTECH</NavLogo>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded />
        </MobileIcon>

        {!hasSuperAdminRole() && (
          <AdminLinks>
            {ADMIN_LINKS.map((link) => (
              <li key={link.to}>
                <AdminLink
                  to={link.to}
                  $active={location.pathname.startsWith(link.to)}
                >
                  {link.label}
                </AdminLink>
              </li>
            ))}
          </AdminLinks>
        )}

        <ProfileArea
          ref={dropdownRef}
          onClick={() => setProfileOpen((p) => !p)}
        >
          <WelcomeText>Welcome, {user?.firstName || "Admin"}</WelcomeText>
          <AvatarCircle>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} />
            ) : (
              initials
            )}
          </AvatarCircle>
          <Dropdown isOpen={profileOpen}>
            <DropdownHeader>{user?.firstName || "Admin"}</DropdownHeader>
            {/* <DropdownItem onClick={goToProfile}>Profile</DropdownItem> */}
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </Dropdown>
        </ProfileArea>

        { !hasSuperAdminRole() && isOpen &&(
          <MobileMenu isOpen={isOpen}>
            {ADMIN_LINKS.map((link) => (
              <AdminLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </AdminLink>
            ))}

          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default AdminNavbar;
