class CommonService {
  userIsAdmin({ user }) {
    return user.role === "admin";
  }
  userIsUser({ user }) {
    return user.role === "user";
  }
}

const commonService = new CommonService();

module.exports = commonService;
