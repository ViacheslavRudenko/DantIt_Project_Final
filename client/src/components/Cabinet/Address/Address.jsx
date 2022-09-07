import { Link } from "react-router-dom";
import Links from "../Links/Links";
import { Grid, Typography, IconButton, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdresModal from "./AdresModal";
import {
  showBillingModal,
  showDeliveryModal,
  showModal,
} from "../../../store/cabinet/actions";

const Address = () => {
  const open = useSelector((state) => state.cabinet.showModal);

  const openDelivery = useSelector((state) => state.cabinet.showModalDelivery);
  const openBilling = useSelector((state) => state.cabinet.showModalBilling);
  const dispatch = useDispatch();

  const sayHi = () => {
    console.log("hi");
  };
  // const [open, setOpen] = useState(false);
  const reopen = () => {
    dispatch(showModal(open));
  };

  const openDeliveryModal = () => {
    dispatch(showDeliveryModal(openDelivery));
    reopen();
  };
  const openBillingModal = () => {
    dispatch(showBillingModal(openBilling));
    reopen();
  };

  console.log(open);

  return (
    <>
      <Links />
      {!open && (
        <div className="profile">
          <div className="address">
            <div className="address__left-menu">
              <div className="address__delivery">
                <Typography variant="h4">DELIVERY ADDRESS</Typography>
              </div>
              <input
                onClick={openDeliveryModal}
                className="address__btn"
                type="button"
                value="ADD DELIVERY ADDRESS"
              ></input>
            </div>
            <div className="address__right-menu">
              <div className="address__billing">
                <Typography variant="h4">BILLING ADDRESS</Typography>
                {/* <a href="#">BILLING ADDRESS</a> */}
              </div>
              <input
                onClick={openBillingModal}
                className="address__btn"
                type="button"
                value="ADD BILLING ADDRESS"
              ></input>
            </div>
          </div>
        </div>
      )}
      {open === true ? <AdresModal /> : false}
    </>
  );
};
export default Address;
