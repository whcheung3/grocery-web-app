import { useRouter } from "next/router";
import ProductDetail from "@/components/ProductDetail";

export default function ProductDetailById() {
  const router = useRouter();
  const { objectID } = router.query;

  return <ProductDetail id={objectID} close={() => router.back()} />;
}
