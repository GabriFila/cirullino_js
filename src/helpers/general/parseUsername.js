const parseUsername = username => {
  if (username.charAt(0) === '\u0040') return username.substr(1).toLowerCase();
  return username.toLowerCase();
};

export default parseUsername;
