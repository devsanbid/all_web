"use server";
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../../api/admin/blog";
import { revalidatePath } from "next/cache";

export async function handleGetAllBlogs(params: {
    page?: number;
    limit?: number;
    search?: string;
}) {
    try {
        const currentPage = params.page || 1;
        const pageSize = params.limit || 10;
        const searchQuery = params.search || '';

        const response = await getAllBlogs({
            page: currentPage,
            limit: pageSize,
            search: searchQuery
        });
        if (response.success) {
            return {
                success: true,
                data: response.data,
                pagination: response.meta
            }
        }
        return { success: false, data: [], pagination: null };
    } catch (err: Error | any) {
        return { success: false, data: [], pagination: null, message: err.message || "Failed to get blogs" };
    }
}

export async function handleGetBlogById(id: string) {
    try {
        const response = await getBlogById(id);
        if (response.success) {
            return { success: true, data: response.data };
        }
        return { success: false, data: null, message: "Blog not found" };
    } catch (err: Error | any) {
        return { success: false, data: null, message: err.message || "Failed to get blog" };
    }
}

export async function handleUpdateBlog(id: string, data: any) {
    try {
        const response = await updateBlog(id, data);
        if (response.success) {
            revalidatePath('/admin/blogs');
            return { success: true, data: response.data, message: "Blog updated successfully" };
        }
        return { success: false, data: null, message: "Failed to update blog" };
    } catch (err: Error | any) {
        return { success: false, data: null, message: err.message || "Failed to update blog" };
    }
}

export const handleDeleteBlog = async (id: string) => {
    try {
        const response = await deleteBlog(id);
        if (response.success) {
            revalidatePath('/admin/blogs');
            return { success: true, message: "Blog deleted successfully" };
        }
        return { success: false, message: "Failed to delete blog" };
    } catch (err: Error | any) {
        throw new Error(
            err.message || "Failed to delete blog"
        );
    }
}
