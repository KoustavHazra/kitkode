
module.exports = {
  validate: (schema) => async (req, res, next) => {
      try {
        const parseBody = await schema.parseAsync(req.body);
        console.log(`validation for signup or login in server side, ${parseBody}`);
        req.body = parseBody;
        next();
        
      } catch (err) {
        const status = 422;
        const message = "Fill the input details properly";
        const extraDetails = err.issues.map((curElem) => curElem.message);
    
        const error = {
          status,
          message,
          extraDetails,
        };

        next(error);
      }
  }
};
