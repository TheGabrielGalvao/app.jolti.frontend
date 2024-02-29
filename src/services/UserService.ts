import { AxiosError, AxiosResponse } from "axios";
import { api } from "../config/api";
import { BaseService } from "./BaseService";
import { UserModel } from "../models/User.model";

const API_URL = "User";

export default new (class UserService extends BaseService<UserModel> {
  constructor() {
    super(API_URL, "uuid");
  }

  async getFullUserInfo(): Promise<UserModel> {
    const { data } = await api.get<UserModel>(`${this.getUrl()}/full-info`, {
      headers: this.getHeaders(),
    });

    return data;
  }

  async register(data: UserModel): Promise<UserModel | string> {
    const response: AxiosResponse<UserModel> = await api.post<UserModel>(
      "User/register",
      data
    );

    return response.data;
  }
})();
