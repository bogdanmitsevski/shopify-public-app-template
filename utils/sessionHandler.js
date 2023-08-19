import { Session } from "@shopify/shopify-api";
import Cryptr from "cryptr";
import { sessions } from "./models/models.js";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeSession = async (session) => {
  const result = await sessions.findOne({where:{id:session.id}});
  if(result === null) {
    await sessions.create({
      id:session.id,
      content:cryption.encrypt(JSON.stringify(session)),
      shop:session.shop
    });
  }
  else {
  await sessions.update(
    {
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
      upsert: true
    },
    { where: { id: session.id } }
  );
  }

  return true;
};

const loadSession = async (id) => {
  const sessionResult = await sessions.findOne({ id });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await sessions.destroy({ where: { id: id } });
  return true;
};

const sessionHandler = { storeSession, loadSession, deleteSession };

export default sessionHandler;
