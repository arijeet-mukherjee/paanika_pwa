import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import React, { Component } from 'react';
function Template(props) {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}

export default Template;
