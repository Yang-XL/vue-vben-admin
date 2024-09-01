export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization');

  if (!token) {
    setResponseStatus(event, 401);
    return useResponseError('UnauthorizedException', 'Unauthorized Exception');
  }

  const query = getQuery(event);
  const children = MOCK_ChildMenu_List.findLast((a) => a.PId === query.Id);

  if (children !== undefined) {
    return useResponseSuccess(children);
  }
  const parent = MOCK_ParentMenu_List.findLast((a) => a.PId === query.Id);
  if (parent === undefined) {
    return useResponseError('ID错误');
  }
  return useResponseSuccess(parent);
});
