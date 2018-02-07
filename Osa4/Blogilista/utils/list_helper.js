const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const addition = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(addition, 0);
};

module.exports = {
  dummy,
  totalLikes
};
