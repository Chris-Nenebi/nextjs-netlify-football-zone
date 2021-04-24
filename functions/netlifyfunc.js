exports.handler = async (event, context) => {
  console.log("netlify func runned");

  const data = {
    name: "Chris",
    age: 35,
    sex: "M",
  };

  // return response to the browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
