import { Barcode } from "phosphor-react";
import { EPositionItemMenu, Module } from "../../../core/types/Navigation";
import { FeatureProvider } from "../../../core/components/templates/FeatureProvider";
import { ProductForm } from "./features/Product/pages/ProductForm";
import { ProductList } from "./features/Product/pages/ProductList";
import { ProductCategoryForm } from "./features/Category/pages/ProductCategoryForm";
import { CategoryList } from "./features/Category/pages/CategoryList";

export const productRoutes: Module = {
  id: 150,
  name: "products",
  label: "Produtos",
  icon: <Barcode  />,
  order: 6,
  position: EPositionItemMenu.MIDDLE,
  route: "/products",
  element: (
    <FeatureProvider
      title="Produtos"
      rootPath="/products"
      initialPath="/products/product/list"
    />
  ),
  private: true,
  pages: [
    {
      id: 151,
      name: "new-product",
      label: "Novo",
      route: "/products/product/new",
      element: <ProductForm />,
      private: true,
    },
    {
      id: 152,
      name: "edit-product",
      label: "Editar",
      route: "/products/product/edit/:uuid",
      element: <ProductForm />,
      private: true,
      exact: false,
    },
    {
      id: 153,
      name: "list-product",
      label: "Produto",
      showInFeatureMenu: true,
      route: "/products/product/list",
      element: <ProductList />,
      private: true,
    },
    
    {
      id: 154,
      name: "new-category",
      label: "Novo",
      route: "/products/category/new",
      element: <ProductCategoryForm />,
      private: true,
    },
    {
      id: 155,
      name: "edit-category",
      label: "Editar",
      route: "/products/category/edit/:uuid",
      element: <ProductCategoryForm />,
      private: true,
      exact: false,
    },
    {
      id: 156,
      name: "list-category",
      label: "Categoria",
      showInFeatureMenu: true,
      route: "/products/category/list",
      element: <CategoryList />,
      private: true,
    },
  ],
};
