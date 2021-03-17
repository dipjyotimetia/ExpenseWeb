const categoryController = (Category) => {
    const post = (req, res) => {
        const category = new Category(req.body);
        category.save((err, category) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(category);
        })
    }

    const get = (req, res) => {
        const query = {};
        Category.find(query, (err, category) => {
            if (err) {
                return res.send(err);
            }
            return res.json(category);
        });
    }
    return { post, get };
}

module.exports = categoryController;