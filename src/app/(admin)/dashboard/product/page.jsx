import Link from "next/link";
import SidebarWrapper from "../../../../components/SidebarWrapper";
import { Button } from "../../../../components/ui/button";
import { basedUrl } from "../../../../utils/basedUrl";
import ProductTable from "../../../../components/admin/product/ProductTable";



export default async function Product() {
  // const products = await fetch(`http://localhost:3000/api/products`);
  // const data = await products.json();

  return (
    <>
      <SidebarWrapper>
        <div className="container mx-auto py-10 px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <Link href="/dashboard/product/addproduct">
              <Button>Add Product</Button>
            </Link>
          </div>
          {/* <ProductTable data={data} /> */}
        </div>
      </SidebarWrapper>
    </>
  )
}
