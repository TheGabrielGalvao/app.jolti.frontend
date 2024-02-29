import { ContactModel } from "../models/Contact.model";
import { BaseService } from "./BaseService";

const API_URL = "Contact";

export default new (class ContactService extends BaseService<ContactModel> {
  constructor() {
    super(API_URL, "uuid");
  }
})();
