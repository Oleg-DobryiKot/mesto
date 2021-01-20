class UserInfo {
  constructor({
    userNameInputElement,
    userDescriptionInputElement,
    userNameElement,
    userDescriptionElement,
    userAvatarElement,
    id
  }) {
    this._userNameInputElement = userNameInputElement;
    this._userDescriptionInputElement = userDescriptionInputElement;
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
    this._userAvatarElement = userAvatarElement;
    this._id = id;
  }

  getUserInfo() {
    const userInformation = {
      name: this._userNameInputElement.textContent,
      about: this._userDescriptionInputElement.textContent,
      avatar: this._userAvatarElement.src,
      id: this._id
    };

    return userInformation;
  }

  setUserInfo(id, name, about, avatar) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._id = id;
    this._userAvatarElement.src = avatar;
  }
};

export default UserInfo;