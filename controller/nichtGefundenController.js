const nichtGefundenHandler = (req, res) => {
  const error = new Error("diesen Endpunkt gibt es nicht!!!");
  error.statusCode = 401;
  throw error;
};
export default nichtGefundenHandler;
