import { Box, Button, Grid, Stack } from "@mui/material";
import CheckboxForm from "./FilterItems/CheckboxForm";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MaterialSlider from "./FilterItems/MaterialSlider";
import FilterMobileHeader from "./FilterMobileHeader";
import {
  getMinMaxPrice,
  setFilterLink,
  getCategories,
  getItemInFilter,
} from "./filterFunctions";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsFilterPreloader } from "../../../store/catalog/actions";
import CheckedFilterItem from "./CheckedFilterItem";
import { filterTitles } from "./data";

const Filter = () => {
  const [currentPrice, setCurrentPrice] = useState([100, 1000]);
  const [isFilterUsing, setIsFilterUsing] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [categories, setCategories] = useState(getCategories(search));
  const [arrOfCheckedItem, setArrOfCheckedItem] = useState([]);
  const [itemCLicked, setItemCliked] = useState("");
  const dispatch = useDispatch();
  const [isMobileFilterBtnShow, setIsMobileFilterBtnShow] = useState(false);
  const categorieProductList = useSelector(
    (state) => state.catalog.categorieProductList
  );
  const location = useLocation();

  const nightMode = useSelector((state) => state.nightMode);

  useEffect(() => {
    location.state && setCategories(location.state.categories);
    setCurrentPrice(getMinMaxPrice(categorieProductList));
    getItemInFilter(search, setArrOfCheckedItem);
  }, [categorieProductList]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      categories: [],
      brand: [],
      mechanism: [],
      material: [],
      color: [],
      currentPrice: getMinMaxPrice(categorieProductList),
    },
  });

  const submitFilter = (values) => {
    const link = setFilterLink(values, currentPrice);
    setSearch(link + "&perPage=10&startPage=1");
    setIsFilterUsing(true);
    setIsMobileFilterBtnShow(false);
    document.getElementById("filter").style = "none";
    setItemCliked("");
  };

  const resetFilter = () => {
    reset();
    setSearch(
      categories.length ? `categories=${categories}&perPage=10&startPage=1` : ""
    );
    setCurrentPrice(getMinMaxPrice(categorieProductList));
    setIsFilterUsing(false);
    setArrOfCheckedItem([]);
    setIsMobileFilterBtnShow(false);
    setItemCliked("");
  };

  const getLinkOnChange = (values) => {
    dispatch(
      fetchAllProductsFilterPreloader(
        "/products/filter" + setFilterLink(values, currentPrice)
      )
    );
  };

  return (
    <Box p={2} width={{ mobile: "100%", desktop: 280 }} textAlign="center">
      <FilterMobileHeader
        isMobileFilterBtnShow={isMobileFilterBtnShow}
        setIsMobileFilterBtnShow={setIsMobileFilterBtnShow}
      />

      <Stack>
        <CheckedFilterItem arrOfCheckedItem={arrOfCheckedItem} />

        <Box display={{ mobile: "none", desktop: "block" }} id="filter">
          <form
            onSubmit={handleSubmit((data) => {
              submitFilter(data);
            })}
            onChange={handleSubmit((values) => getLinkOnChange(values))}
          >
            <Box textAlign="start">
              {filterTitles.map((title) => (
                <Box key={title}>
                  <CheckboxForm
                    title={title}
                    register={register}
                    arrOfCheckedItem={arrOfCheckedItem}
                    setArrOfCheckedItem={setArrOfCheckedItem}
                    itemCLicked={itemCLicked}
                    setIdemCliked={setItemCliked}
                  />
                </Box>
              ))}
            </Box>
            <MaterialSlider
              title={"currentPrice"}
              name="currentPrice"
              defaultValues={getMinMaxPrice(categorieProductList)}
              register={register}
              currentPrice={currentPrice}
              setCurrentPrice={setCurrentPrice}
            />
            <Stack direction="row" justifyContent="space-evenly">
              <Button sx={{ color: nightMode ? "#fff" : "#000" }} type="submit">
                Apply
              </Button>
              <Button
                type="button"
                onClick={resetFilter}
                disabled={!isFilterUsing}
                sx={{ color: nightMode ? "#fff" : "#000" }}
              >
                Reset
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default Filter;
