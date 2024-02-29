import { ERegisterStatus } from "../core/util/enum/EStatus";

export type UserModel = {
  uuid?: string;
  userName: string;
  userEmail: string;
  userPass?: string;
  status?: ERegisterStatus;
  userProfileUuid?: string;
};
