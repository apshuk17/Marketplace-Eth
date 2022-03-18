export const EnhanceHook = swrResponse => ({
    ...swrResponse,
    hasInitialResponse: swrResponse.data || swrResponse.error
});
