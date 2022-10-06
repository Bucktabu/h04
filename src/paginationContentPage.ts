import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {contentOnThePage, currentPage, giveSkipNumber, pagesCount, totalCount} from "./helperFunctions";

export const paginationContentPage = (sortBy: string | undefined,
                                      sortDirection: string | undefined,
                                      pageNumber: string | null | undefined, // номер страницы, которая будет возвращена
                                      pageSize: string | null | undefined,
                                      content: blogsType | postsType) => {

    const tc = content.length
    const pc = Math.ceil(tc / Number(pageSize))

    const pageWithContent = {
        "pagesCount": pc,
        "page": currentPage(pageNumber),
        "pageSize": contentOnThePage(pageSize),
        "totalCount": tc,
        "items": content.slice(giveSkipNumber(pageNumber, pageSize), giveSkipNumber(pageNumber, pageSize) + contentOnThePage(pageSize))
    }

    return pageWithContent
}