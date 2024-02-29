import { ERegisterStatus } from "../core/util/enum/EStatus";

export interface UserProfileModel {
  uuid?: string;
  name: string;
  description?: string;
  status: ERegisterStatus;
  permissions?: string[];
  userGroups?: string[];
}
