class UserInfo {
  constructor({
    userNameInputElement,
    userDescriptionInputElement,
    userNameElement,
    userDescriptionElement
  }) {
    this._userNameInputElement = userNameInputElement;
    this._userDescriptionInputElement = userDescriptionInputElement;
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
  }

  getUserInfo() {
    const userInformation = {
      name: this._userNameInputElement.textContent,
      description: this._userDescriptionInputElement.textContent,
    };

    return userInformation;
  }

  setUserInfo(name, description) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = description;
  }
};

export default UserInfo;