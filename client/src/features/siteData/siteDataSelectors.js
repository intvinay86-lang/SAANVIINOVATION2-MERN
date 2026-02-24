// Site data selectors
export const selectSiteData = (state) => state.siteData.mainData;
export const selectSiteDataLoading = (state) => state.siteData.loading;
export const selectSiteDataError = (state) => state.siteData.error;
export const selectFooterData = (state) => state.siteData.mainData?.footer;
