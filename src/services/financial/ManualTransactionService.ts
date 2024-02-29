import { ManualTransactionModel } from "../../models/Financial/ManualTransaction.model";
import { BaseService } from "../BaseService";

const API_URL = "ManualTransaction";

export default new (class ManualTransactionService extends BaseService<ManualTransactionModel> {
    constructor() {
        super(API_URL, "uuid");
    }

})();
