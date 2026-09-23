import { useParams } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail";

export default function ProductDetails() {
  const { slug } = useParams();

  return <ProductDetail slug={slug} />;
}