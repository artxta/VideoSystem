"use strict";
// excepciones personalizadas
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) Error.captureStackTrace(this, BaseException)
  }
}

// excepción se invoca constructor sin "new"
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Constructor can´t be called as a function", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

// excepción campo vacio
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(`El parametro ${param} no puede estar vació o es invalido`, fileName, lineNumber);
    this.name = "EmptyValueException";
  }
}

// exportar excepciones
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
}