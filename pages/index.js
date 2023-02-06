import Product from "@/pages/product/index";

export default function Home(props) {
  return (
    <Product
      searchField={props.searchField}
      setSearchField={props.setSearchField}
    />
  );
}
