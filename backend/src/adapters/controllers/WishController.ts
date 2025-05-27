import WishRepositoryImp from "../../infra/Service/WishRepositoryImp";
import { Wish } from "../../types/Wish";
import SaveWishCase from "../../usecases/WishlistCase/SaveWishCase";

const saveWishController = async (req, res) => {
    const { id_user, id_book } = req.body;
    const wish: Wish = {
        id: null,
        id_user: id_user,
        id_book: id_book,
        added_date: new Date(),
    }
    const WishRepository = new WishRepositoryImp();
    const saveWish = new SaveWishCase(WishRepository);
    try {
        const wish_response = await saveWish.execute(wish);
        res.status(200).send(wish_response);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    saveWishController
}
