"use client"
import Link from "next/link"
import Image from "next/image"
import { Edit, Loader2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProductTable(props) {
  const { data } = props
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (_id) => {
    try {
      setDeleteLoading(true)
      const response = await fetch(`/api/products/${_id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      toast.success("Product deleted successfully");
      router.refresh();
      setDeleteLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong")
      setDeleteLoading(false)
    }
  }

  return (
    <div className="rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Image
                  src={product?.image || "/placeholder.svg"}
                  alt={product?.title}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{product?.title}</TableCell>
              <TableCell className="font-medium">{product?.desc}</TableCell>
              <TableCell className="font-medium">{product?.type}</TableCell>
              <TableCell>${product?.price}</TableCell>
              <TableCell>{product?.condition}</TableCell>
              <TableCell>{product?.location}</TableCell>
              <TableCell>{product?.number}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/dashboard/product/${product?._id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product?._id)}
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
  )
}
