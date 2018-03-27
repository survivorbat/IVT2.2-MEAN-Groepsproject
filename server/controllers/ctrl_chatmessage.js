module.exports = {
    getAll(req, res, next){
        const result = "Chatmessage route works";
        res.status(200).json(result);
    }
}