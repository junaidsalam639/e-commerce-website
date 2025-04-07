import Link from "next/link";
import { Button } from "../../../../../components/ui/button";
import EditCategoryForm from "../../../../../components/admin/category/EditCategoryForm";
import { basedUrl } from "../../../../../utils/basedUrl";
import SidebarWrapper from "../../../../../components/SidebarWrapper";

export default async function EditCategory({ params: { id } }) {
  const categories = await fetch(`${basedUrl}/categories/${id}`, {
    method: 'GET',
  });
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
            <EditCategoryForm data={data} />
          </div>
        </div>
      </SidebarWrapper>
    </>
  )
}

