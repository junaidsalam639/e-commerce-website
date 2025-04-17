import Link from "next/link";
import SidebarWrapper from "../../../../../components/SidebarWrapper";
import { Button } from "../../../../../components/ui/button";
import AddCategoryForm from "../../../../../components/admin/category/AddCategoryForm";


export default function AddCategory() {
  return (
    <>
      <SidebarWrapper>
        <div className="container mx-auto py-10 px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Category</h1>
            <Link href="/dashboard/category">
              <Button variant="outline">Back to Categories</Button>
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <AddCategoryForm />
          </div>
        </div>
      </SidebarWrapper>
    </>
  )
}
