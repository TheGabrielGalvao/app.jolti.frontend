import { EReleaseFlow } from "../../common/enum/Release"
import { ContactModel } from "../Contact.model"
import { UserModel } from "../User.model"
import { EFinancialReleaseStatus } from "./FinancialRelease.model"

export interface ManualTransactionModel {
    uuid?: string
    status: EFinancialReleaseStatus
    value: number
    flow: EReleaseFlow
    title: string
    description?: string
    dueDate?: Date
    contactUuid?: string
    contact?: ContactModel
    user?: UserModel
}
