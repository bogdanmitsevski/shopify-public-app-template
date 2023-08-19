import { stores, sessions } from "../../utils/models/models.js";

/**
 * @typedef { import("../../_developer/types/2023-07/webhooks.js").APP_UNINSTALLED } webhookTopic
 */

const appUninstallHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  /** @type {webhookTopic} */
  const webhookBody = JSON.parse(webhookRequestBody);
  await stores.update({ isActive: false },{where: {shop:shop}});
  await sessions.destroy({ where:{shop:shop} });
};

export default appUninstallHandler;
