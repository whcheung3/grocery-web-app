import Product from "@/pages/product/index";

export default function Home(props) {
  return (
    <>
      <h3>
        most commonly purchased grocery items, such as milk, bread, and eggs
      </h3>
      <Product
        searchField={props.searchField}
        setSearchField={props.setSearchField}
      />
    </>
  );
}
