const _isEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

export const EnhanceHook = (swrResponse) => {
  const { data, error, ...restSWRResponse } = swrResponse;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);
  return {
    data,
    error,
    ...restSWRResponse,
    isEmpty,
    hasInitialResponse,
  };
};
