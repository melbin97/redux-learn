const logger = param => store => next => action => {
  console.log("inside logger", param)
  next(action)
}

export default logger;