export const formatNavLink = (link) => {
  return (
    link
      // Replace '_' with spaces
      .replace(/_/gi, ' ')
      // Uppercase the first letter of each words except "of"
      .replace(/\b(\w+?)\b/gi, (match, content) => {
        return capitalize(content);
      })
  );
};

const capitalize = (word) => {
  if (word !== 'of') {
    return word[0].toUpperCase() + word.slice(1);
  } else {
    return word
  }
};
