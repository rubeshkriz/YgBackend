// Create Token and saving in cookie

const sendToken = (tokening, statusCode,data, res) => {
    const token = tokening.getJWTToken(data);
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      status: "Sucess",
      data,
      token,
    });
  };
  
  module.exports = sendToken;