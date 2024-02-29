import { AxiosResponse } from "axios";
import { AuthModel, AuthResponse } from "../models/Auth.model";
import { BaseService } from "./BaseService";
import { api } from "../config/api";

const API_URL = "Auth";

export default new (class AuthService extends BaseService<AuthModel> {
  constructor() {
    super(API_URL);
  }

  async login(data: AuthModel): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post(
      `${this.getUrl()}/login`,
      data
    );
    return response.data;
  }
})();
