"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { ImagePlus, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export default function EditCategoryForm(props) {
  const { data } = props
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data?.name || "")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(data?.imageUrl || null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const response = await fetch(`/api/categories/${data?._id}`, {
        method: "PUT",
        body: formData,
      });
      const datas = await response.json();
      setName("");
      setImage(null);
      toast.success("Category edit successfully");
      router.push("/dashboard/category");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Image</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-32">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-md border"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center bg-muted">
                  <ImagePlus className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
              <div className="w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/category")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Category
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

