import BlogModel, { IBlog } from "../models/blog.model";
export interface IBlogRepository {
    createBlog(blogData: any): Promise<IBlog>;
    getBlogById(id: string): Promise<IBlog | null>;
    getBlogByAuthorId(authorId: string): Promise<IBlog[]>;
    getPaginatedBlogs(page: number, limit: number, search?: string): Promise<{data: IBlog[], total: number}>;
    updateBlog(id: string, blogData: any): Promise<IBlog | null>;
    deleteBlog(id: string): Promise<boolean>;
}
export class BlogMongoRepository implements IBlogRepository {
    async createBlog(blogData: any): Promise<IBlog> {
        const blog = new BlogModel(blogData);
        await blog.save();
        return blog;
    }
    async getBlogById(id: string): Promise<IBlog | null> {
        const blog = await BlogModel
            .findById(id)
            .populate("authorId", "firstName lastName email");
        return blog;
    }
    async getBlogByAuthorId(authorId: string): Promise<IBlog[]> {
        const blogs = await BlogModel
            .find({authorId: authorId as any})
            .populate("authorId", "firstName lastName email");
        return blogs;
    }
    async getPaginatedBlogs(page: number, limit: number, search?: string): Promise<{data: IBlog[], total: number}> {
        const skip = (page - 1) * limit;
        const query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }
        const blogs = await BlogModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .populate("authorId", "firstName lastName email");
        const totalBlogs = await BlogModel.countDocuments(query);
        return { data: blogs, total: totalBlogs };
    }
    async updateBlog(id: string, blogData: any): Promise<IBlog | null> {
        const blog = await BlogModel
            .findByIdAndUpdate(id, blogData, { new: true, runValidators: true })
            .populate("authorId", "firstName lastName email");
        return blog;
    }
    async deleteBlog(id: string): Promise<boolean> {
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        return !!deletedBlog;
    }
}
