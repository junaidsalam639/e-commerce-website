"use client"
import Link from "next/link"
import Image from "next/image"
import { Edit, Loader2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CategoryTable(props) {
  const { data } = props
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (_id) => {
    try {
      setDeleteLoading(true)
      const response = await fetch(`/api/categories/${_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.success("Category delete successfully");
      router.refresh();
      setDeleteLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong")
      setDeleteLoading(false)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Image
                    src={category?.imageUrl || "/placeholder.svg"}
                    alt={category?.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{category?.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/category/${category?._id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(category?._id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

