const axios = require('axios')

module.exports = (req, res) => {
    const { method, body, url } = req.body;
    if (method == 'GET') {
        const { data } = await axios.get(url);
        return res.send(data);
    }

    if (method == 'POST') {
        const { data } = await axios.post(url, body);
        return res.send(data);   
    }
};
