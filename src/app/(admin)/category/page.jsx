import Link from "next/link";
import SidebarWrapper from "../../../components/SidebarWrapper";
import { Button } from "../../../components/ui/button";
import CategoryTable from "../../../components/admin/category/CategoryTable";
import { basedUrl } from "../../../utils/basedUrl";



export default async function Category() {
  // const categories = await fetch(`${basedUrl}/categories`);
  // const data = await categories.json();
  return (
    <>
      <SidebarWrapper>
        <div className="container mx-auto py-10 px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Categories</h1>
            <Link href="/dashboard/category/addcategory">
              <Button>Add Category</Button>
            </Link>
          </div>
          {/* <CategoryTable data={data} /> */}
        </div>
      </SidebarWrapper>
    </>
  )
}
