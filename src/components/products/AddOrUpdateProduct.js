/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name,value);
  }


  function validate(name,value){
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün ismi olmalıdır",
      }));
    } else {
      setErrors((previousErrors) => ({ ...previousErrors, productName: "" }));
    }
    if(name === "unitPrice" && value === ""){
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Ürün fiyatı olmalıdır",
      }));
    }else {
      setErrors((previousErrors) => ({ ...previousErrors, unitPrice: "" }));
    }
    if(name === "quantityPerUnit" && value === ""){
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Ürün adedi olmalıdır",
      }));
    }else {
      setErrors((previousErrors) => ({ ...previousErrors, quantityPerUnit: "" }));
    }
    if(name === "unitsInStock" && value === ""){
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitsInStock: "Ürün stoğu olmalıdır",
      }));
    }else {
      setErrors((previousErrors) => ({ ...previousErrors, unitsInStock: "" }));
    }

  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const { productId } = useParams(ownProps);
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
