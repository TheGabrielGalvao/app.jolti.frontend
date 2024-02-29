import { ERegisterStatus } from "../../core/util/enum/EStatus"

export interface StockLocationModel {
    uuid?: string
    name: string 
    description?: string 
    status: ERegisterStatus 
}