import { api } from "../../config/api";
import { FinancialDashboardModel } from "../../models/Financial/FinancialDashboard.model";
import { FinancialReleaseModel } from "../../models/Financial/FinancialRelease.model";
import { BaseService } from "../BaseService";

const API_URL = "ManualTransaction";

export default new (class FinancialReleaseService extends BaseService<FinancialReleaseModel> {
  constructor() {
    super(API_URL, "uuid");
  }

  async getDashboard(): Promise<FinancialDashboardModel> {
    const { data } = await api.get<FinancialDashboardModel>(
      "FinancialDashboard",
      {
        headers: this.getHeaders(),
      }
    );
    return data;
  }
})();
