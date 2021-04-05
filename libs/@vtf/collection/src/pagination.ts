import {reactive} from "vue";

export type Pagination = {
  page: number,
  perPage: number,
  totalPages?: number,
}

type PaginationOptions = {
  persistenceName: string,
}

export const createPagination = (options?: PaginationOptions) => {
  const value = reactive({
    page: 1,
    perPage: 10,
    totalPages: 1,
  } as Pagination)

  if (options?.persistenceName) {
    console.log("Load localStorage/sessionStorage stuff for collection", options.persistenceName)
  }

  return {
    value,
  }
}
