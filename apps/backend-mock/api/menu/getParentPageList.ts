export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization');

  if (!token) {
    setResponseStatus(event, 401);
    return useResponseError('UnauthorizedException', 'Unauthorized Exception');
  }

  // const username = Buffer.from(token, 'base64').toString('utf8');
  // const query = getQuery(event);

  // if (query.NameOrCode !== undefined) {
  //   MOCK_ParentMenu_List.filter((a) => a.Name.includes(query.NameOrCode));
  // }

  // const menus =
  //   MOCK_MENUS.find((item) => item.username === username)?.menus ?? [];
  return useResponseSuccess(MOCK_ParentMenu_List);
});
