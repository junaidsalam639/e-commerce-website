import Link from "next/link";
import { Button } from "../../../../../components/ui/button";
import SidebarWrapper from "../../../../../components/SidebarWrapper";
import EditProductForm from "../../../../../components/admin/product/EditProductForm";
import { basedUrl } from "@/src/utils/basedUrl";

export default async function EditProduct({ params: { id } }) {
  // const productRes = await fetch(`http://localhost:3000/api/products/${id}`);
  // const product = await productRes.json();

  const categories = await fetch(`${basedUrl}/categories`);
  const data = await categories.json();

  return (
    <>
      <SidebarWrapper>
        <div className="container mx-auto py-10 px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Category</h1>
            <Link href="/dashboard/category">
              <Button variant="outline">Back to Categories</Button>
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            {/* <EditProductForm product={product} categories={data} /> */}
          </div>
        </div>
      </SidebarWrapper>
    </>
  )
}

