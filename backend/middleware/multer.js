import multer from "multer";
import path from "path";

// Cấu hình Multer: lưu file vào thư mục 'uploads/' với tên file ngẫu nhiên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Lưu vào thư mục uploads/
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname); // Lấy phần mở rộng của file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Tạo tên file ngẫu nhiên
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt); // Tên file sẽ là `fieldname-uniqueId.extension`
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn file tải lên tối đa là 5MB
});

export default upload;
