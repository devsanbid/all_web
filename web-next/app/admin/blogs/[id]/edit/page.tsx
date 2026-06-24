import { handleGetBlogById } from "@/lib/actions/admin/blog-action";
import BlogEditForm from "./_components/BlogEditForm";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const result = await handleGetBlogById(id);

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-red-600">Blog not found</h1>
                <p className="mt-2 text-gray-600">{result.message}</p>
            </div>
        );
    }

    return <BlogEditForm blog={result.data} />;
}
