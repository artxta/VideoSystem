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

// excepción clase abstracta
class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: La clase ${className} es abstracta`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
  }

}

// exportar excepciones
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AbstractClassException,
}