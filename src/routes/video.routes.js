import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, publishVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";

const router = Router();

router.route('/publish-video').post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideo
)

router.route('/get-video/:videoId').get(verifyJWT,getVideoById);

router.route('/update-video/:videoId').patch(verifyJWT,upload.single("thumbnail"),updateVideo);

router.route('/delete-video/:videoId').delete(verifyJWT,deleteVideo);

router.route('/toggle-publishStatus/:videoId').patch(verifyJWT,togglePublishStatus);

router.route('/get-all-videos').get(verifyJWT,getAllVideos);





export default router