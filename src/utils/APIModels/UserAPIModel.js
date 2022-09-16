class UserAPIModel {
  constructor(userData) {
    this.name = userData.name;
    this.about = userData.about;
    this.avatar = userData.avatar;
    this._id = userData._id;
  }
}

module.exports = UserAPIModel;
