import { ChangeEvent, useState } from "react"

import { User } from "src/mocks/user-mocks"

export default function usePagination(initialPage = 0, initialLimit = 10) {
    const [page, setPage] = useState<number>(initialPage)
    const [limit, setLimit] = useState<number>(initialLimit)

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage)
    }

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value, 10))
    }

    /* call this on the data that you want to paginate in order to get the paginated data */
    const paginate = (users: User[], page: number, limit: number): User[] => {
        return users.slice(page * limit, page * limit + limit)
    }

    return {
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        paginate,
    }
}
