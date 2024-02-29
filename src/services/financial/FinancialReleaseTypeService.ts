import { api } from "../../config/api";
import { FinancialDashboardModel } from "../../models/Financial/FinancialDashboard.model";
import { FinancialReleaseTypeModel } from "../../models/Financial/FinancialReleaseType.model";
import { BaseService } from "../BaseService";

const API_URL = "FinancialReleaseType";

export default new (class FinancialReleaseTypeService extends BaseService<FinancialReleaseTypeModel> {
  constructor() {
    super(API_URL, "uuid");
  }

  async getDashboard(): Promise<FinancialDashboardModel> {
    const { data } = await api.get<FinancialDashboardModel>(
      "FinancialReleaseType",
      {
        headers: this.getHeaders(),
      }
    );

    return data;
  }
})();
