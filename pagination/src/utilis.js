const paginate = (followers) => {
  const RES_PER_PAGE = 10;
  const pages = Math.ceil(followers.length / RES_PER_PAGE);

  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * RES_PER_PAGE;

    return followers.slice(start, start + RES_PER_PAGE);
  });
};

export default paginate;
