const validateJWT = ({ findUser }) =>
  async function (decoded) {
      try {
        await findUser(decoded.id);
        return { isValid: true };
      } catch (err) {
        return { isValid: false };
      }
  };

module.exports = { validateJWT };