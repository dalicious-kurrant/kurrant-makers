export const buildCustomUrl = (
  type = 'total',
  limit = 10,
  page = 1,
  foodName,
) => {
  let basicUrl;
  if (type !== 'total') {
    basicUrl = [`makers/reviews/pending?limit=${limit}&page=${page}`];
  } else {
    basicUrl = [`makers/reviews/all?limit=${limit}&page=${page}`];
  }

  // 1. 그냥 집어넣기 3

  if (foodName) {
    basicUrl.push(`&foodName=${foodName}`);
  }

  return basicUrl.join('');
};
