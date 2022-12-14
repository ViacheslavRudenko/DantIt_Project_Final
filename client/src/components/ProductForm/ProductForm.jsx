import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Forms/Form";
import {
  productFormDefaultValues,
  productInputNames,
  productSchema,
} from "./data";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProductForm = ({ initialValue, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productFormDefaultValues,
  });

  const fieldArray = useFieldArray({
    control,
    name: "imageUrls",
  });

  useEffect(() => reset(initialValue), [initialValue]);

  const setValidation = (values) => {
    onSubmit(values, reset);
  };

  return (
    <>
      <Form
        actionWithForm={setValidation}
        formArr={productInputNames}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        btnName={"APPROVE"}
        fieldArray={fieldArray}
        control={control}
      />
    </>
  );
};

ProductForm.propTypes = {
  initialValue: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ProductForm;
