import { stores } from "../../utils/models/models.js";

const isShopActive = async (req, res, next) => {
  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }
  const isShopAvaialble = await stores.findOne({ where: {shop:shop } });

  if (isShopAvaialble === null || !isShopAvaialble.isActive) {
    if (isShopAvaialble === null) {
      await stores.create({ shop:shop, isActive: false });
    } else if (!isShopAvaialble.isActive) {
      console.log(isShopAvaialble);
      await stores.update({ isActive: false },{where:{ shop }});
    }
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

export default isShopActive;
