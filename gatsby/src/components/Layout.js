import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout(props) {
  return (
    <div>
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
}
