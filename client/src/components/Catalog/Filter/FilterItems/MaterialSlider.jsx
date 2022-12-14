import { useState } from "react";
import PropTypes from "prop-types";
import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const MaterialSlider = ({
  title,
  defaultValues,
  register,
  currentPrice,
  setCurrentPrice,
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Typography
        p={1}
        fontWeight="bold"
        textTransform="uppercase"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsShow(!isShow)}
        textAlign="start"
      >
        {!isShow ? "+ " : "- "} Price
      </Typography>

      <Box sx={{ display: isShow ? "block" : "none", width: "100%", p: 1 }}>
        <Box pt={1}>
          <Typography component="span">$</Typography>
          <Typography component="span">{currentPrice[0]}</Typography>
          <Typography component="span"> - </Typography>
          <Typography component="span">{currentPrice[1]}</Typography>
        </Box>
        <Slider
          /* eslint-disable react/jsx-props-no-spreading */
          {...register(title)}
          value={currentPrice}
          onChange={(e, v) => setCurrentPrice(v)}
          min={defaultValues[0]}
          max={defaultValues[1]}
          valueLabelDisplay="auto"
        />
      </Box>
    </>
  );
};
export default MaterialSlider;

MaterialSlider.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.array,
  register: PropTypes.func,
  currentPrice: PropTypes.array,
  setCurrentPrice: PropTypes.func,
};
