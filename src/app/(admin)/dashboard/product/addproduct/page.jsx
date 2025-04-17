import Link from "next/link";
import SidebarWrapper from "../../../../../components/SidebarWrapper";
import { Button } from "../../../../../components/ui/button";
import AddProductForm from "../../../../../components/admin/product/AddProductForm";
import { basedUrl } from "@/src/utils/basedUrl";


export default async function AddProduct() {
  const categories = await fetch(`${basedUrl}/categories`);
  const data = await categories.json();
  return (
    <>
      <SidebarWrapper>
        <div className="container mx-auto py-10 px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <Link href="/dashboard/product">
              <Button variant="outline">Back to Product</Button>
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <AddProductForm categories={data} />
          </div>
        </div>
      </SidebarWrapper>
    </>
  )
}
