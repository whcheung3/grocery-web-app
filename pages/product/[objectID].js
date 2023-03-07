import { useRouter } from "next/router";
import ProductDetail from "@/components/ProductDetail";
import SearchBar from "@/components/SearchBar";

export default function ProductDetailById(props) {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <>
      {/* <SearchBar
        searchField={props.searchField}
        setSearchField={props.setSearchField}
        setPage={props.setPage}
      /> */}
      <ProductDetail id={objectID} show close={() => router.back()} />
    </>
  );
}
