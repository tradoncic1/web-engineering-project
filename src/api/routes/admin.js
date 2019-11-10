module.exports = (router, db, mongojs, jwt, config) => {

    // router.use((req, res, next) => {
    //     console.log(`Admin route accessed by: ${req.ip}`); // log visits

    //     /* Check for proper JWT */
    //     let authorization = req.get('Authorization');
    //     if (authorization) {
    //         jwt.verify(authorization, config.JWT_SECRET, (error, decoded) => {
    //             if (error) {
    //                 res.status(401).send({ message: 'Unauthorized access: ' + error.message });
    //             } else {
    //                 let userType = decoded.type;
    //                 if (userType === 'admin') {
    //                     next();
    //                 } else {
    //                     res.status(401).send({ message: 'Unauthorized access: improper privileges' });
    //                 }
    //             }
    //         });
    //     } else {
    //         res.status(401).send({ message: 'Unauthorized access.' });
    //     }
    // })

    router.get('/users', (req, res) => {

        db.users.find({}, (err, docs) => {
            res.json(docs);
        })
    });

    router.get('/users/:username', (req, res) => {
        var username = req.params.username;
        db.users.findOne({ username: username }, function (err, docs) {
            res.json(docs);
        })
    });
}