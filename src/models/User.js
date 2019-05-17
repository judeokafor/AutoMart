class User {
  constructor(
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    gender,
    email,
    password,
    avatar,
    isAdmin,
    role,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.role = role;
  }
}
export default User;
