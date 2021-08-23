const User = require('../../../models/user')

//GET /api/user/list

exports.list = (req,res) => {
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not admin'
        })
    }

    User.find({})
    .then(
        users => {
            res.json({users});
        }
    )
}

exports.assignAdmin = (req, res) => {
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not admin'
        })
    }

    User.findOneByUsername(req.params.username)
    .then(
        user => user.assignAdmin()
    ).then (
        res.json({
            success: true
        })
    )
}