import { ConfigurationError } from "@pipedream/platform";
import quickbooks from "../../quickbooks.app.mjs";

export default {
  key: "quickbooks-search-vendors",
  name: "Search Vendors",
  description: "Searches for vendors. [See docs here](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/vendor#query-a-vendor)",
  version: "0.1.6",
  type: "action",
  props: {
    quickbooks,
    includeClause: {
      propDefinition: [
        quickbooks,
        "includeClause",
      ],
      optional: false,
    },
    maxResults: {
      propDefinition: [
        quickbooks,
        "maxResults",
      ],
    },
    orderClause: {
      propDefinition: [
        quickbooks,
        "orderClause",
      ],
    },
    startPosition: {
      description: "The starting count of the response for pagination.",
      label: "Start Position",
      optional: true,
      type: "string",
    },
    whereClause: {
      propDefinition: [
        quickbooks,
        "whereClause",
      ],
      optional: false,
    },
    minorVersion: {
      propDefinition: [
        quickbooks,
        "minorVersion",
      ],
    },
  },
  async run({ $ }) {
    if (!this.includeClause || !this.whereClause) {
      throw new ConfigurationError("Must provide includeClause, whereClause parameters.");
    }

    var orderClause = "";
    if (this.orderClause) {
      orderClause = ` ORDERBY  ${this.orderClause}`;
    }

    var startPosition = "";
    if (this.startPosition) {
      startPosition = ` STARTPOSITION  ${this.startPosition}`;
    }

    var maxResults = "";
    if (this.maxResults) {
      maxResults = ` MAXRESULTS ${this.maxResults}` || "";
    }

    //Prepares the request's query parameter
    const query = `select ${this.includeClause} from Vendor where ${this.whereClause}${orderClause}${startPosition}${maxResults}`;

    const response = await this.quickbooks.query({
      $,
      params: {
        minorversion: this.minorVersion,
        query,
      },
    });

    if (response) {
      $.export("summary", "Successfully retrieved vendors");
    }

    return response;
  },
};
