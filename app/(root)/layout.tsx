import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import ProductCarousel from "@/components/shared/product/product-carousel";
import React from "react";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ProductCarousel />
      <main className="flex-1 wrapper mt-16">{children}</main>
      {modal}
      <Footer />
    </div>
  );
}
