import { HttpService } from './base.service'

class AuthService extends HttpService {
    private readonly prefix: string = "auth";


  /**
   * Basic Authenticate User
   * @param data
   */
   login = (data: any) => this.post(`${this.prefix}/login`, data);

   signUp = (data: any) => this.post(`${this.prefix}/signup`, data);
 
   forgetPassword = (data: any) => this.post(`${this.prefix}/forget-password`, data);
 
   resetPassword = (data: any) => this.post(`${this.prefix}/reset-password`, data);
 
   verifyCode = (data: any) => this.post(`${this.prefix}/verify-code`, data);

}

export const authService = new AuthService();

