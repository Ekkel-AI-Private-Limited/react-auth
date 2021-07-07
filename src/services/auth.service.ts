import { HttpService } from './base.service'

class AuthService extends HttpService {
    private readonly prefix: string = "auth";

    /**
     * Basic Authenticate User
     * @paramdata
     */
    login = (data: any): Promise<any> => this.post(this.prefix + '/social-login', data)

}

export const authService = new AuthService();

