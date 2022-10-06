import {blogsCollection, postsCollection} from "./db";
import {postsType, postType} from "../types/posts-type";
import {contentOnThePage, giveSkipNumber} from "../helperFunctions";

export const postsRepository = {
    async createNewPost(newPost: postType): Promise<postType> {
        await postsCollection.insertOne(newPost)

        return newPost
    },

    async givePosts(sortBy: string | undefined,
                    sortDirection: string | undefined,
                    pageNumber: string | null | undefined,
                    pageSize: string | null | undefined): Promise<postsType> {

        const filter: any = {}

        if (!sortBy) {
            sortBy = 'createdAt'
        }

        if (!sortDirection) {
            sortDirection = 'desc'
        }

        return await postsCollection
            .find(filter, {projection: {_id: false}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(giveSkipNumber(pageNumber, pageSize))
            .limit(contentOnThePage(pageSize))
            .toArray()
    },

    async giveTotalCount(): Promise<number> {
        const posts = await postsCollection.find({}).toArray()
        return posts.length
    },

    async givePostById(id: string): Promise<postType | null> {
       return await postsCollection.findOne({id:id}, {projection: {_id: false}})
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})

        return result.matchedCount === 1
    },

    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllPosts(): Promise<boolean> {
        try {
            await postsCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('postsCollection => deleteAllPosts =>', e)
            return false
        }
    }
}