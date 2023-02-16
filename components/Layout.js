import { Container } from "react-bootstrap";
import MainNav from "./MainNav";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{props.children}</Container>
      <br />
      <Footer />
    </>
  );
}
