// export interface IUser {
//   email: string;
//   password: string;
//   isActive: boolean;
// }

// export interface IActiveUser extends IUser {
//   isActive: true
// }

// export interface IAdmin extends IActiveUser {
//   adminSince: Date;
// }

// export class AccountManager {
//   users = new Array();

//   /**
//    * Create a new user account
//    * @param email email address
//    * @param password the user's password
//    * @return the new user account. An admin must activate it using activateNewUser
//    * @see this.activateNewUser
//    */
//   register(email: string, password: string): IUser {
//     if(!email) throw 'Must provide an email';
//     if(!password) throw 'Must provide a password';
//     let user = { email, password, isActive: false };
//     this.users.push(user);
//     return user;
//   }

//   /**
//    * Activate a new user account
//    * @param approver The admin who's approving this new user
//    * @param userToApprove Newly-registered user, who is to be activated
//    * @return the updated user object, now activated
//    */
//   activateNewUser(approver: IAdmin, userToApprove: IUser): IActiveUser {
//     if (!approver.adminSince) throw "Approver is not an admin!";
//     return Object.assign(userToApprove, { isActive: (true as true) });
//   }

//   /**
//    * Promote a normal user to admin
//    * @param existingAdmin admin who is promoting another user
//    * @param user an active user who you're making an admin
//    * @return the updated user object, now can also be regarded as an admin
//    */
//   promoteToAdmin(existingAdmin: IAdmin, user: IActiveUser) {
//     if (!existingAdmin.adminSince) throw "Not an admin!";
//     // if (user.isActive !== true) throw "User must be active in order to be promoted to admin!";
//     return Object.assign(user, { adminSince: new Date() });
//   }
// }

interface User {
  email: string;
  password: string;
}

interface ConfirmedUser extends User {
  isActive: true;
}

interface Admin extends ConfirmedUser {
  adminSince: Date;
}
export class AccountManager {
  users: User[] = new Array();

  /**
   * Create a new user account
   * @param email email address
   * @param password the user's password
   * @return the new user account. An admin must activate it using activateNewUser
   * @see this.activateNewUser
   */
  register(email: string, password: string): User {
    if (!email) throw 'Must provide an email';
    if (!password) throw 'Must provide a password';
    let user = { email, password };
    this.users.push(user);
    console.log('string');
    return user;
  }

  /**
   * Activate a new user account
   * @param approver The admin who's approving this new user
   * @param userToApprove Newly-registered user, who is to be activated
   * @return the updated user object, now activated
   */
  activateNewUser(approver: Admin, userToApprove: User): ConfirmedUser {
    if (!approver.adminSince) throw 'Approver is not an admin!';
    let toConfirm = userToApprove as ConfirmedUser;
    toConfirm.isActive = true;
    return toConfirm;
  }

  /**
   * Promote a normal user to admin
   * @param existingAdmin admin who is promoting another user
   * @param user an active user who you're making an admin
   * @return the updated user object, now can also be regarded as an admin
   */
  promoteToAdmin(existingAdmin: Admin, user: ConfirmedUser) {
    if (!existingAdmin.adminSince) throw 'Not an admin!';
    if (user.isActive !== true) throw 'User must be active in order to be promoted to admin!';
    let newAdmin = user as Admin;
    console.log(newAdmin);
    // newAdmin.adminSince = new Date();
    return newAdmin;
  }
}

let admin: Admin = { email: 'a', password: 'b', isActive: true, adminSince: new Date() };
let u: ConfirmedUser = { email: 'a', password: 'b', isActive: true };

let am = new AccountManager();

console.log(am.promoteToAdmin(admin, u).email);
