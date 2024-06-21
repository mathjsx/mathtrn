module.exports = (req, res) => {
    if (req.method === 'GET') {
        if (savedName) {
            res.status(200).json({ message: `Nama yang tersimpan: ${savedName}` });
        } else {
            res.status(404).json({ message: 'Tidak ada nama yang tersimpan di server.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};