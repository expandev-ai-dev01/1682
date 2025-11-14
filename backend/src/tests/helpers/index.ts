export const generateMockRequest = (params: any = {}, body: any = {}, query: any = {}) => ({
  params,
  body,
  query,
  headers: {},
  method: 'GET',
  path: '/test',
});

export const generateMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
