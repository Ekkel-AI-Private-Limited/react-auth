import { createSelector } from "@reduxjs/toolkit"

const selectDomain = (state: any) => state.auth

export const selectToken =createSelector(selectDomain, (auth:any) => auth.access_token)
