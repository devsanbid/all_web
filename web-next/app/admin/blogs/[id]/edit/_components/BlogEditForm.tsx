"use client";
import { handleUpdateBlog } from "@/lib/actions/admin/blog-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BlogEditForm({ blog }: { blog: any }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        content: blog?.content || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await handleUpdateBlog(blog._id, formData);
            if (result.success) {
                toast.success("Blog updated successfully");
                router.push("/admin/blogs");
            } else {
                toast.error(result.message || "Failed to update blog");
            }
        } catch (err: Error | any) {
            toast.error(err.message || "Failed to update blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Edit Blog</h1>
                <Link
                    href="/admin/blogs"
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg transition-colors"
                >
                    Back
                </Link>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={12}
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                        required
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Updating..." : "Update Blog"}
                    </button>
                    <Link
                        href="/admin/blogs"
                        className="px-6 py-2 border border-gray-300 rounded-lg font-medium transition-colors text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
