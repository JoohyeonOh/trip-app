import { Link, useLocation } from "react-router-dom";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";
import { useCallback } from "react";
import useUser from "@/hooks/auth/useUser";
import Text from "./Text";
import Spacing from "./Spacing";

export default function Navbar() {
  const { pathname } = useLocation();
  const showSignButton = ["/signup", "/signin"].includes(pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user) {
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
              }
              alt="user-image"
              width={40}
              height={40}
              style={{ borderRadius: "100%" }}
            />
          </Link>
          <Spacing direction="horizontal" size={10} />
          <Link to="/settings">
            <img
              src="https://cdn3.iconfinder.com/data/icons/internet-relative/200/Configuration-64.png"
              alt="settings"
              width={35}
              height={35}
            />
          </Link>
        </Flex>
      );
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">
        <Text bold typography="t3" color="gray700">
          TRAVELOG
        </Text>
      </Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 28px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray100};
  z-index: 10;
`;
