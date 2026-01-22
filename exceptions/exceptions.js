"use strict";
// excepciones personalizadas
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) Error.captureStackTrace(this, BaseException)
  }
}

