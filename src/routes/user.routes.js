import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelPorfile, 
    getWatchHistory, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage
} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT,changeCurrentPassword);
router.route('/current-user').get(verifyJWT,getCurrentUser);
// use patch if post is use it will update all the account details
router.route('/update-account').patch(verifyJWT,updateAccountDetails);

router.route('/update-avatar').patch(verifyJWT,upload.single("avatar"),updateUserAvatar);
router.route('/update-CoverImage').patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage);

router.route('/c/:username').get(verifyJWT,getUserChannelPorfile);
router.route('/history').get(verifyJWT,getWatchHistory);

export default router