export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization');

  if (!token) {
    setResponseStatus(event, 401);
    return useResponseError('UnauthorizedException', 'Unauthorized Exception');
  }

  const query = getQuery(event);
  const childrenIdx = MOCK_ChildMenu_List.findIndex((a) => a.PId === query.Id);

  if (childrenIdx !== -1) {
    MOCK_ChildMenu_List.slice(childrenIdx, 1);
    return useResponseSuccess();
  }
  const parentIdx = MOCK_ParentMenu_List.findIndex((a) => a.PId === query.Id);
  if (parentIdx === -1) {
    return useResponseError('ID错误');
  }
  MOCK_ParentMenu_List.slice(parentIdx, 1);
  return useResponseSuccess();
});
