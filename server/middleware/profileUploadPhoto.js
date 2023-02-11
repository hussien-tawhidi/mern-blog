import multer from "multer";
const upload = multer({ dest: "uploads/" });
import sharp from "sharp"

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // success
    cb(null, true);
  } else {
    // failed
    cb(
      {
        message: "not supported formate",
      },
      false
    );
  }
};

export const profilePhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, //1mb
});
