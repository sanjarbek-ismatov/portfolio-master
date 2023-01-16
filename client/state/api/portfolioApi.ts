import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { portfolio } from 'types/portfolio'
import { serverUrl } from 'utils/serverUrl'
const url = serverUrl()
const portfolioApi = createApi({
  reducerPath: 'portfolio',
  baseQuery: fetchBaseQuery({baseUrl: `${url}/api`}),
  endpoints(build) {
      return {
        getAllPorfolios: build.query<portfolio[], null>({
          query: () => '/portfolio/all'
        })
      }
  },
})
export const {useGetAllPorfoliosQuery} = portfolioApi