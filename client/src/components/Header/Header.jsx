import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "../SearchInput/SearchInput";
import { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useEffect } from "react";
import { switchThemeAction } from "../../store/switchTheme/action";

const Header = (props) => {
  const { statusOpenBurger, handleBurger, closeBurger } = props;
  const isLogin = useSelector((state) => state.userAccount.isLogin);
  const cartList = useSelector((state) => state.cart.list);
  const [isExpandInput, setIsExpandInput] = useState(true);
  const nightMode = useSelector((state) => state.nightMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("nightMode")) {
      dispatch(
        switchThemeAction(!JSON.parse(localStorage.getItem("nightMode")))
      );
    } else {
      document.activeElement.classList.remove("light");
      document.activeElement.classList.add("dark");
    }
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("nightMode")) === true) {
      document.activeElement.classList.remove("light");
      document.activeElement.classList.add("dark");
    }

    if (JSON.parse(localStorage.getItem("nightMode")) === false) {
      document.activeElement.classList.add("light");
      document.activeElement.classList.remove("dark");
    }
  }, [nightMode]);

  const themeSwitcherLS = (value) => {
    localStorage.setItem("nightMode", JSON.stringify(!nightMode));
    dispatch(switchThemeAction(!value));
  };

  return (
    <header className={statusOpenBurger ? "header active-burger" : "header"}>
      <div className="container">
        <div className="container-header">
          <div className="header__top-content">
            <div className="header__logo-container">
              <Link to="/" className="header__logo-container_link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="40"
                  viewBox="0 0 259 68"
                  fill="none"
                >
                  <path
                    d="M18.656 9.208C19.328 9.208 19.8693 9.41333 20.28 9.824C20.6907 10.1973 20.896 10.608 20.896 11.056C20.896 11.504 20.784 11.7653 20.56 11.84C16.8267 11.84 13.9333 13.24 11.88 16.04C9.82667 18.84 8.8 22.8347 8.8 28.024C8.8 33.176 9.92 37.544 12.16 41.128C14.4 44.6747 17.5173 46.448 21.512 46.448C25.5067 46.448 28.68 44.5627 31.032 40.792C33.4213 37.0213 34.616 32.28 34.616 26.568C34.616 20.8187 33.216 16.0587 30.416 12.288C27.6533 8.48 24.032 6.576 19.552 6.576C15.072 6.576 11.2453 7.864 8.072 10.44C4.936 12.9787 3.29333 16.0213 3.144 19.568C2.99467 19.8667 2.64 20.016 2.08 20.016C1.10933 19.9413 0.624 19.3067 0.624 18.112C0.624 16.9173 0.866667 15.704 1.352 14.472C1.83733 13.2027 2.62133 11.9333 3.704 10.664C4.78667 9.39467 6.056 8.256 7.512 7.248C8.968 6.20267 10.7787 5.36266 12.944 4.728C15.1093 4.09333 17.4427 3.776 19.944 3.776C25.9547 3.776 30.752 5.94133 34.336 10.272C37.9573 14.5653 39.768 20.016 39.768 26.624C39.768 33.232 38.1067 38.5707 34.784 42.64C31.4987 46.672 27.0747 48.688 21.512 48.688C15.9867 48.688 11.6187 46.7653 8.408 42.92C5.23467 39.0747 3.648 33.8853 3.648 27.352C3.648 24.2907 4.13333 21.5467 5.104 19.12C6.112 16.6933 7.4 14.7893 8.968 13.408C12.1413 10.608 15.3707 9.208 18.656 9.208ZM49.6507 36.48V45.384C49.2774 45.9067 48.624 46.168 47.6907 46.168C46.7574 46.168 46.0107 45.888 45.4507 45.328C44.8907 44.7307 44.6107 43.872 44.6107 42.752V21.472C44.984 20.9493 45.6374 20.688 46.5707 20.688C47.504 20.688 48.2507 20.9867 48.8107 21.584C49.3707 22.144 49.6507 22.984 49.6507 24.104V28.36C51.5174 23.7307 54.0934 21.416 57.3787 21.416C59.7307 21.416 61.448 22.0507 62.5307 23.32C63.6134 24.552 64.1547 26.0267 64.1547 27.744C64.1547 28.6773 63.8747 29.424 63.3147 29.984C62.7547 30.544 62.2134 30.824 61.6907 30.824C60.72 30.824 60.0854 30.6 59.7867 30.152C60.0107 29.592 60.1227 28.7893 60.1227 27.744C60.1227 26.6987 59.768 25.7467 59.0587 24.888C58.3494 24.0293 57.4907 23.6 56.4827 23.6C54.728 23.6 53.1414 25.2053 51.7227 28.416C50.3414 31.5893 49.6507 34.2773 49.6507 36.48ZM66.7123 15.2C66.0776 14.5653 65.7603 13.7813 65.7603 12.848C65.7603 11.9147 66.0776 11.1307 66.7123 10.496C67.347 9.824 68.131 9.488 69.0643 9.488C69.9976 9.488 70.7816 9.824 71.4163 10.496C72.0883 11.1307 72.4243 11.9147 72.4243 12.848C72.4243 13.7813 72.0883 14.5653 71.4163 15.2C70.7816 15.8347 69.9976 16.152 69.0643 16.152C68.131 16.152 67.347 15.8347 66.7123 15.2ZM66.4883 24.104C66.4883 22.984 66.7683 22.144 67.3283 21.584C67.8883 20.9867 68.5976 20.688 69.4563 20.688C70.315 20.688 71.0056 20.9493 71.5283 21.472V37.544C71.5283 39.672 71.939 41.2773 72.7603 42.36C73.5816 43.4427 74.7016 43.984 76.1203 43.984C77.539 43.984 78.8643 43.1253 80.0963 41.408C81.3283 39.6907 81.9443 36.9093 81.9443 33.064C82.019 32.84 82.299 32.728 82.7843 32.728C83.4563 32.728 83.7923 33.7173 83.7923 35.696C83.7923 38.5707 83.0083 41.0347 81.4403 43.088C79.8723 45.1413 77.875 46.168 75.4483 46.168C72.4243 46.168 70.1656 45.272 68.6723 43.48C67.2163 41.688 66.4883 39.1493 66.4883 35.864V24.104ZM98.7583 22.312C99.2436 21.2293 100.009 20.688 101.054 20.688C102.137 20.688 102.94 20.9493 103.462 21.472V49.92C103.91 49.8827 104.62 49.864 105.59 49.864C106.561 49.864 107.046 50.2747 107.046 51.096L106.71 51.936C105.292 51.936 104.209 51.9547 103.462 51.992V54.904C103.425 58.7493 102.529 61.7547 100.774 63.92C99.057 66.1227 96.761 67.224 93.8863 67.224C92.169 67.224 90.6383 66.7013 89.2943 65.656C87.9876 64.648 87.3343 63.0427 87.3343 60.84C87.3343 58.0027 88.3423 55.744 90.3583 54.064C92.3743 52.384 95.0623 51.208 98.4223 50.536V42.304C96.8543 44.88 94.689 46.168 91.9263 46.168C85.393 46.168 82.1263 41.8933 82.1263 33.344C82.1263 29.0133 83.1343 25.8213 85.1503 23.768C87.2036 21.7147 89.9103 20.688 93.2703 20.688C95.8463 20.688 97.6756 21.2293 98.7583 22.312ZM98.4223 34.296V30.32C98.4223 27.6693 97.9743 25.7653 97.0783 24.608C96.1823 23.4507 95.137 22.872 93.9423 22.872C92.785 22.872 91.8703 22.984 91.1983 23.208C90.5263 23.432 89.873 23.8987 89.2383 24.608C88.0436 25.952 87.4463 28.864 87.4463 33.344C87.4463 36.2933 87.7076 38.5893 88.2303 40.232C88.753 41.8747 89.3503 42.92 90.0223 43.368C90.6943 43.7787 91.6276 43.984 92.8223 43.984C94.0543 43.984 95.2863 43.2187 96.5183 41.688C97.7876 40.12 98.4223 37.656 98.4223 34.296ZM98.4223 54.792V52.664C92.9343 53.896 90.1903 56.6773 90.1903 61.008C90.1903 62.3147 90.545 63.304 91.2543 63.976C91.9636 64.6853 92.8036 65.04 93.7743 65.04C95.3423 65.04 96.4996 64.312 97.2463 62.856C98.0303 61.4 98.4223 58.712 98.4223 54.792ZM109.15 15.2C108.515 14.5653 108.198 13.7813 108.198 12.848C108.198 11.9147 108.515 11.1307 109.15 10.496C109.784 9.824 110.568 9.488 111.502 9.488C112.435 9.488 113.219 9.824 113.854 10.496C114.526 11.1307 114.862 11.9147 114.862 12.848C114.862 13.7813 114.526 14.5653 113.854 15.2C113.219 15.8347 112.435 16.152 111.502 16.152C110.568 16.152 109.784 15.8347 109.15 15.2ZM108.926 24.104C108.926 22.984 109.206 22.144 109.766 21.584C110.326 20.9867 111.035 20.688 111.894 20.688C112.752 20.688 113.443 20.9493 113.966 21.472V37.544C113.966 39.672 114.376 41.2773 115.198 42.36C116.019 43.4427 117.139 43.984 118.558 43.984C119.976 43.984 121.302 43.1253 122.534 41.408C123.766 39.6907 124.382 36.9093 124.382 33.064C124.456 32.84 124.736 32.728 125.222 32.728C125.894 32.728 126.23 33.7173 126.23 35.696C126.23 38.5707 125.446 41.0347 123.878 43.088C122.31 45.1413 120.312 46.168 117.886 46.168C114.862 46.168 112.603 45.272 111.11 43.48C109.654 41.688 108.926 39.1493 108.926 35.864V24.104ZM154.804 32.728C155.476 32.728 155.812 33.7173 155.812 35.696C155.812 38.8693 155.121 41.408 153.74 43.312C152.396 45.216 150.417 46.168 147.804 46.168C145.19 46.168 143.174 45.272 141.756 43.48C140.374 41.688 139.684 39.1493 139.684 35.864V29.312C139.684 24.8693 138.564 22.648 136.324 22.648C134.345 22.648 132.721 23.656 131.452 25.672C130.182 27.688 129.548 31.0667 129.548 35.808V45.384C129.174 45.9067 128.521 46.168 127.588 46.168C126.654 46.168 125.908 45.888 125.348 45.328C124.788 44.7307 124.508 43.872 124.508 42.752V21.472C124.881 20.9493 125.59 20.688 126.636 20.688C128.577 20.688 129.548 22.088 129.548 24.888C131.116 22.088 133.598 20.688 136.996 20.688C139.422 20.688 141.345 21.4533 142.764 22.984C144.22 24.5147 144.948 26.7173 144.948 29.592V37.544C144.948 39.672 145.284 41.2773 145.956 42.36C146.628 43.4427 147.617 43.984 148.924 43.984C150.268 43.984 151.444 43.1627 152.452 41.52C153.46 39.84 153.964 37.0213 153.964 33.064C154.001 32.84 154.281 32.728 154.804 32.728ZM170.726 22.312C171.211 21.2293 171.976 20.688 173.022 20.688C174.104 20.688 174.907 20.9493 175.43 21.472V37.544C175.43 39.672 175.766 41.2773 176.438 42.36C177.11 43.4427 178.024 43.984 179.182 43.984C182.691 43.984 184.446 40.344 184.446 33.064C184.483 32.84 184.763 32.728 185.286 32.728C185.958 32.728 186.294 33.7173 186.294 35.696C186.294 38.8693 185.603 41.408 184.222 43.312C182.878 45.216 180.974 46.168 178.51 46.168C174.739 46.168 172.238 44.5067 171.006 41.184C170.296 42.7147 169.326 43.928 168.094 44.824C166.862 45.72 165.462 46.168 163.894 46.168C157.36 46.168 154.094 41.8933 154.094 33.344C154.094 29.0133 155.102 25.8213 157.118 23.768C159.171 21.7147 161.878 20.688 165.238 20.688C167.814 20.688 169.643 21.2293 170.726 22.312ZM160.198 40.232C160.72 41.8747 161.318 42.92 161.99 43.368C162.662 43.7787 163.558 43.984 164.678 43.984C165.798 43.984 167.011 43.2933 168.318 41.912C169.662 40.4933 170.334 38.664 170.334 36.424V28.752C170.334 26.9973 169.867 25.5787 168.934 24.496C168.038 23.4133 167.011 22.872 165.854 22.872C164.734 22.872 163.838 22.984 163.166 23.208C162.494 23.432 161.859 23.8987 161.262 24.608C160.03 25.952 159.414 28.864 159.414 33.344C159.414 36.2933 159.675 38.5893 160.198 40.232ZM201.019 32.728C201.691 32.728 202.027 33.7173 202.027 35.696C202.027 38.5707 201.243 41.0347 199.675 43.088C198.107 45.1413 196.109 46.168 193.683 46.168C190.659 46.168 188.4 45.272 186.907 43.48C185.413 41.688 184.667 39.1493 184.667 35.864V14.808C184.667 9.992 185.171 6.464 186.179 4.224C187.187 1.984 188.96 0.863997 191.499 0.863997C195.195 0.863997 197.043 3.36533 197.043 8.368C197.043 12.1387 196.296 15.1627 194.803 17.44C193.347 19.7173 191.667 21.416 189.763 22.536V37.544C189.763 39.672 190.173 41.2773 190.995 42.36C191.816 43.4427 192.936 43.984 194.355 43.984C195.773 43.984 197.099 43.1253 198.331 41.408C199.563 39.6907 200.179 36.9093 200.179 33.064C200.253 32.84 200.533 32.728 201.019 32.728ZM194.635 8.424C194.635 4.84 193.739 3.048 191.947 3.048C191.499 3.048 191.144 3.19733 190.883 3.496C190.659 3.79466 190.453 4.54133 190.267 5.736C189.931 7.56533 189.763 12.3813 189.763 20.184C193.011 17.832 194.635 13.912 194.635 8.424ZM200.587 15.2C199.953 14.5653 199.635 13.7813 199.635 12.848C199.635 11.9147 199.953 11.1307 200.587 10.496C201.222 9.824 202.006 9.488 202.939 9.488C203.873 9.488 204.657 9.824 205.291 10.496C205.963 11.1307 206.299 11.9147 206.299 12.848C206.299 13.7813 205.963 14.5653 205.291 15.2C204.657 15.8347 203.873 16.152 202.939 16.152C202.006 16.152 201.222 15.8347 200.587 15.2ZM200.363 24.104C200.363 22.984 200.643 22.144 201.203 21.584C201.763 20.9867 202.473 20.688 203.331 20.688C204.19 20.688 204.881 20.9493 205.403 21.472V37.544C205.403 39.672 205.814 41.2773 206.635 42.36C207.457 43.4427 208.577 43.984 209.995 43.984C211.414 43.984 212.739 43.1253 213.971 41.408C215.203 39.6907 215.819 36.9093 215.819 33.064C215.894 32.84 216.174 32.728 216.659 32.728C217.331 32.728 217.667 33.7173 217.667 35.696C217.667 38.5707 216.883 41.0347 215.315 43.088C213.747 45.1413 211.75 46.168 209.323 46.168C206.299 46.168 204.041 45.272 202.547 43.48C201.091 41.688 200.363 39.1493 200.363 35.864V24.104ZM215.945 15.816C215.945 14.696 216.225 13.856 216.785 13.296C217.345 12.6987 218.055 12.4 218.913 12.4C219.772 12.4 220.463 12.6613 220.985 13.184V21.472H228.657C229.441 21.472 229.945 21.6213 230.169 21.92C230.431 22.2187 230.561 22.7227 230.561 23.432H220.985V37.544C220.985 39.5973 221.564 41.184 222.721 42.304C223.916 43.424 225.279 43.984 226.809 43.984C229.124 43.984 230.823 43.1253 231.905 41.408C232.988 39.6907 233.529 36.9093 233.529 33.064C233.604 32.84 233.884 32.728 234.369 32.728C235.041 32.728 235.377 33.7173 235.377 35.696C235.377 38.72 234.612 41.2213 233.081 43.2C231.588 45.1787 229.273 46.168 226.137 46.168C223.001 46.168 220.519 45.3467 218.689 43.704C216.86 42.0613 215.945 39.616 215.945 36.368V15.816ZM257.184 33.4C257.968 33.4 258.36 33.9973 258.36 35.192C258.36 37.9547 257.389 40.4747 255.448 42.752C253.544 45.0293 250.632 46.168 246.712 46.168C242.792 46.168 239.637 45.1227 237.248 43.032C234.896 40.904 233.72 37.8053 233.72 33.736C233.72 29.6293 234.765 26.4373 236.856 24.16C238.947 21.8453 241.616 20.688 244.864 20.688C247.216 20.688 248.933 21.3227 250.016 22.592C251.099 23.824 251.64 25.2987 251.64 27.016C251.64 29.816 250.464 32.1493 248.112 34.016C245.797 35.8453 242.829 36.76 239.208 36.76C239.544 39.1493 240.403 40.96 241.784 42.192C243.203 43.3867 245.051 43.984 247.328 43.984C249.643 43.984 251.715 43.1253 253.544 41.408C255.411 39.6533 256.344 37.096 256.344 33.736C256.381 33.512 256.661 33.4 257.184 33.4ZM239.04 34.184V34.688C241.355 34.3893 243.352 33.6613 245.032 32.504C246.749 31.3467 247.608 29.6293 247.608 27.352C247.608 25.896 247.291 24.7947 246.656 24.048C246.021 23.264 245.125 22.872 243.968 22.872C242.213 22.872 240.944 23.7307 240.16 25.448C239.413 27.1653 239.04 30.0773 239.04 34.184ZM244.528 16.6C244.005 16.6 243.539 16.432 243.128 16.096C242.755 15.7227 242.437 15.1813 242.176 14.472L248.28 3.608C248.989 2.376 249.885 1.76 250.968 1.76C251.491 1.76 251.939 1.94667 252.312 2.32C252.723 2.656 253.077 3.17867 253.376 3.888L247.16 14.808C246.451 16.0027 245.573 16.6 244.528 16.6Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
            {nightMode === true ? (
              <LightModeOutlinedIcon
                style={{ cursor: "pointer", marginRight: "30px" }}
                onClick={() => themeSwitcherLS(false)}
              />
            ) : (
              <DarkModeOutlinedIcon
                style={{ cursor: "pointer", marginRight: "30px" }}
                onClick={() => themeSwitcherLS(true)}
              />
            )}

            <div className="header__account-container">
              {window.screen.width < 720 ? (
                <SearchInput
                  isExpandInput={isExpandInput}
                  setIsExpandInput={setIsExpandInput}
                />
              ) : (
                <SearchInput />
              )}
              <Link
                to={isLogin ? "/my-account/user" : "/my-account/entry"}
                className="header__account-container__link account"
                style={{ display: isExpandInput ? "flex" : "none" }}
              >
                <div className="header__account-container__ico">
                  <img
                    className="header__account-container__ico-img"
                    src="../images/account-ico.svg"
                    alt="my-account"
                  />
                </div>
                {/* <p className="header__account-container__text">My account</p> */}
              </Link>
              <Link
                to="/cart"
                className="header__account-container__link shopping-bag"
                style={{ display: isExpandInput ? "flex" : "none" }}
              >
                <div className="header__account-container__ico">
                  <img
                    className="header__account-container__ico-img"
                    src="../images/shopping-bag-ico.svg"
                    alt="my-account"
                  />
                </div>

                <p className="header__cart-quantity">
                  {cartList && cartList.length}
                </p>
              </Link>

              <a
                href="#!"
                onClick={handleBurger}
                className="header__account-container__link burger"
                // style={{
                //   display:
                //     isExpandInput && window.screen.width < 1023
                //       ? "flex"
                //       : "none",
                // }}
              >
                <div className="header__account-container__ico">
                  {!statusOpenBurger ? (
                    <img
                      className="header__account-container__ico-img"
                      src="../images/burger-ico.svg"
                      alt="my-account"
                    />
                  ) : (
                    <img
                      className="header__account-container__ico-img btn-close"
                      src="../images/close-button.png"
                      alt="cross"
                    />
                  )}
                </div>
              </a>
            </div>
          </div>
          <div className="header__categories-container">
            <Link
              onClick={closeBurger}
              to="/products/filter?categories=mens"
              className="header__categories-container__link"
            >
              MAN
            </Link>
            <Link
              onClick={closeBurger}
              to="/products/filter?categories=ladies"
              className="header__categories-container__link"
            >
              WOMEN
            </Link>
            <Link
              onClick={closeBurger}
              to="/products/filter?categories=accessories"
              className="header__categories-container__link"
            >
              ACCESSORY
            </Link>
          </div>
        </div>
      </div>
      <div className={!statusOpenBurger ? "burger-menu" : "burger-menu_active"}>
        <div className="container">
          <div className="burger-menu__wrapper">
            <div className="burger-menu__login">
              <a className="burger-menu__login_link">Login / Register</a>
            </div>
            <div className="burger-menu__pages">
              <ul className="burger-menu__pages-list pages-list">
                <li className="pages-list__item top-item">
                  <a href="" className="pages-list__item-link">
                    New collection
                  </a>
                </li>
                <li className="pages-list__item top-item">
                  <a href="" className="pages-list__item-link">
                    New arrivals
                  </a>
                </li>
                <li className="pages-list__item bottom-item">
                  <Link
                    onClick={closeBurger}
                    to="/woman"
                    className="pages-list__item-link"
                  >
                    WOMAN COLLECTION
                  </Link>
                </li>
                <li className="pages-list__item bottom-item">
                  <Link
                    onClick={closeBurger}
                    to="/man"
                    className="pages-list__item-link"
                  >
                    MAN COLLECTION
                  </Link>
                </li>
                <li className="pages-list__item bottom-item">
                  <Link
                    onClick={closeBurger}
                    to="/accessory"
                    className="pages-list__item-link"
                  >
                    ACCESSORY
                  </Link>
                </li>
              </ul>
            </div>
            <div className="burger-menu__footer">
              <Box component="h3" className="burger-menu__footer_title">
                HELP
              </Box>
              <ul className="burger-menu__footer_list">
                <li className="burger-menu__footer_list-item">
                  <a href="#!"> Frequently asked questions</a>
                </li>
                <li className="burger-menu__footer_list-item">
                  <Link onClick={closeBurger} to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="burger-menu__footer_list-item">
                  <a href="#!">How to purchase</a>
                </li>
                <li className="burger-menu__footer_list-item">
                  <a href="!#">Payment</a>
                </li>
              </ul>
              <Box component="h3" className="burger-menu__footer_title">
                COMPANY
              </Box>
              <ul className="burger-menu__footer_list">
                <li className="burger-menu__footer_list-item">
                  <a href="#!">History of the brande</a>
                </li>
                <li className="burger-menu__footer_list-item">
                  <a href="#!">Policy</a>
                </li>
                <li className="burger-menu__footer_list-item">
                  <a href="#!">Work with Us</a>
                </li>
              </ul>
              <Box
                component="h3"
                className="burger-menu__footer_title_lst-title"
              >
                FOLLOW US
              </Box>
              <Box
                component="div"
                className="burger-menu__footer_icons footer_icons"
              >
                <a href="#!" className="footer_icons__item">
                  <img
                    className="footer_icons__item_img"
                    src="./images/facebok-logo.png"
                    alt=""
                  />
                </a>
                <a href="!#" className="footer_icons__item">
                  <img
                    className="footer_icons__item_img"
                    src="./images/inst-logo.png"
                    alt=""
                  />
                </a>
                <a href="#!" className="footer_icons__item">
                  <img
                    className="footer_icons__item_img"
                    src="./images/pint-logo.png"
                    alt=""
                  />
                </a>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleBurger: PropTypes.func,
  statusOpenBurger: PropTypes.bool,
  closeBurger: PropTypes.func,
};

export default Header;
