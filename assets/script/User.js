'use strict';

class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getUserName() {
    return this.#userName;
  }

  getEmail() {
    return this.#email;
  }

  getInfo() {
    return `${this.#name}, ${this.#userName}, ${this.#email}`;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  getPages() {
    return this.#pages;
  }

  getGroups() {
    return this.#groups;
  }

  getCanMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    const userInfo = super.getInfo();
    return `${userInfo}, Pages: ${this.#pages}, Groups: ${this.#groups}, Can Monetize: ${this.#canMonetize}`;
  }
}

export { User, Subscriber };