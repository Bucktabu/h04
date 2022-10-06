import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {contentOnThePage, currentPage, pagesCount, totalCount} from "./helperFunctions";

export const paginationContentPage = (sortBy: string | undefined,
                                      sortDirection: string | undefined,
                                      pageNumber: string | null | undefined, // номер страницы, которая будет возвращена
                                      pageSize: string | null | undefined,
                                      content: blogsType | postsType) => {
    const pageWithContent = {
        "pagesCount": pagesCount(pageSize),
        "page": currentPage(pageNumber),
        "pageSize": contentOnThePage(pageSize),
        "totalCount": totalCount(),
        "items": content
    }

    return pageWithContent
}