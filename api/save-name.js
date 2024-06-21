module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { name } = req.body;
        // Lakukan sesuatu dengan nama, misalnya simpan ke database
        // Untuk contoh ini, kita hanya mengembalikan nama yang diterima
        res.status(200).json({ message: `Nama ${name} berhasil disimpan!` });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};