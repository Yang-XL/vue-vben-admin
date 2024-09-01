export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization');

  if (!token) {
    setResponseStatus(event, 401);
    return useResponseError('UnauthorizedException', 'Unauthorized Exception');
  }

  const query = getQuery(event);
  const children = MOCK_ChildMenu_List.filter((a) => a.PId === query.pid);
  return useResponseSuccess(children);
});
