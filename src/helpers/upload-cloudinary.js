const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const { Readable } = require('stream');

module.exports = async (req, res, next) => {
    // upload files
    const arrayLinkFile = [];
    for (img of req.files) {

        if (!img || !img.buffer) {
            req.flash('error', 'Thiếu hình ảnh');
            const previousPage = '/admin/products';
            res.redirect(previousPage);
            return;
        }
        const buffer = img.buffer;
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            Readable.from(buffer).pipe(stream);
        });

        arrayLinkFile.push(uploadResult.secure_url)
    }
    req.linkImg = arrayLinkFile;
    next();
}