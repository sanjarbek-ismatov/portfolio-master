/**
 * This function creates unique link
 * @param {string} username - username of author
 * @param {string} title - title of portfolio
 * @param {object} Portfolio - model of Portfolio
 * @returns {string} - returns generated link
 */
module.exports = async (username, title, Portfolio) => {
  let replacedTitle = title.replace(/ /g, "_");
  const link = `${username}_${replacedTitle}`;
  const isHave = await Portfolio.findOne({ linktitle: link });
  if (isHave) return isHave.linktitle + "_";
  return link;
};
