import common from "../common/common.mjs";
import sampleEmit from "./test-event.mjs";

export default {
  type: "source",
  key: "webflow-new-form-submission",
  name: "New Form Submission",
  description: "Emit new event when a new form is submitted. [See the docs here](https://developers.webflow.com/#trigger-types)",
  version: "1.0.1",
  ...common,
  methods: {
    ...common.methods,
    getWebhookTriggerType() {
      return "form_submission";
    },
    generateMeta(data) {
      return {
        id: data._id,
        summary: `New form ${data._id} submission`,
        ts: Date.parse(data.date),
      };
    },
  },
  sampleEmit,
};
