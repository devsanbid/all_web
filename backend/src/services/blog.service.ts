import { HttpException } from "../exceptions/http-exception";
import { CreateBlogDTO, UpdateBlogDTO } from "../dtos/blog.dto";
import { BlogMongoRepository } from "../repositories/blog.repository";
import { isValidObjectId } from "mongoose";
const blogRepository = new BlogMongoRepository();

export class BlogService {
    async createBlog(blogData: CreateBlogDTO) {
        const createdBlog = await blogRepository.createBlog(blogData);
        return createdBlog;
    }
    async getBlogById(id: string) {
        this.validateBlogId(id);
        const blog = await blogRepository.getBlogById(id);
        if (!blog) {
            throw new HttpException(404, "Blog not found");
        }
        return blog;
    }
    async getBlogsByAuthorId(authorId: string) {
        const blogs = await blogRepository.getBlogByAuthorId(authorId);
        return blogs;
    }
    async getPaginatedBlogs(page?: string, limit?: string, search?: string) {
        const currentPage = page ? parseInt(page, 10) : 1;
        const currentLimit = limit ? parseInt(limit, 10) : 10;
        const { data, total } = await blogRepository.getPaginatedBlogs(currentPage, currentLimit, search);
        const totalPages = Math.ceil(total / currentLimit);
        return {
            data,
            pagination: {
                total,
                page: currentPage,
                limit: currentLimit,
                totalPages
            }
        };
    }
    async updateBlog(id: string, authorId: string, blogData: UpdateBlogDTO) {
        const existingBlog = await this.getBlogById(id);
        if (String((existingBlog.authorId as any)._id || existingBlog.authorId) !== String(authorId)) {
            throw new HttpException(403, "You can only update your own blog");
        }
        const updatedBlog = await blogRepository.updateBlog(id, blogData);
        return updatedBlog;
    }
    async deleteBlog(id: string, authorId: string) {
        const existingBlog = await this.getBlogById(id);
        if (String((existingBlog.authorId as any)._id || existingBlog.authorId) !== String(authorId)) {
            throw new HttpException(403, "You can only delete your own blog");
        }
        const deleted = await blogRepository.deleteBlog(id);
        if (!deleted) {
            throw new HttpException(404, "Blog not found");
        }
        return { id };
    }
    private validateBlogId(id: string) {
        if (!isValidObjectId(id)) {
            throw new HttpException(400, "Invalid blog id");
        }
    }
}
