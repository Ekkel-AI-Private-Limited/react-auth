import { HttpService } from "./base.service";

class UserService extends HttpService {
  prefix = "user";

  /**
   * Get basic Profile
   */
  me = () => this.get(`${this.prefix}/me`);

  /**
   * Get basic Profile
   * @param id User ID
   */
  user = (id: number) => this.get(`${this.prefix}/${id}`);

  /**
   * Update Profile
   * @param data
   */
  update = (data: any) => this.put(`${this.prefix}/me`, data);

  /**
   * Update Profile
   * @param data
   */
  updatePassword = (data: any) => this.put(`${this.prefix}/change-password`, data);
}

export const userService = new UserService();
