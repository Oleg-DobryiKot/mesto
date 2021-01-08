class UserInfo {
  constructor({
    userName,
    userDescription
  }) {
    this._userName = userName;
    this._userDescription = userDescription;
  }

  getUserInfo() {
    const userInformation = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return userInformation;
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
};

export default UserInfo;