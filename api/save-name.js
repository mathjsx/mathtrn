let savedName = '';

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { name } = req.body;
        savedName = name; // Simpan nama ke variabel
        res.status(200).json({ message: `Nama ${name} berhasil disimpan di server!` });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};