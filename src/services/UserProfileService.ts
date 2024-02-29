import { UserProfileModel } from "../models/UserProfile.model";
import { BaseService } from "./BaseService";

const API_URL = "UserProfile";

export default new (class UserProfileService extends BaseService<UserProfileModel> {
  constructor() {
    super(API_URL, "uuid");
  }
})();
