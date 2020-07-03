//express
const express = require('express')
const app = express()

//Bcrypt
const bcrypt = require('bcrypt')

//underscore
const _ = require('underscore')

//JSON Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Import Model
const UsuarioDB = require('../models/userDB.js');
const { verifyToken, verifyRole } = require('../middlewares/authenticator.js');

//GET ALL USERS
app.get('/userList', verifyToken, (req, res) => {

    let from = Number(req.query.from || 0);
    let limit = Number(req.query.from || 10);

    UsuarioDB.find({ /*Filters*/ }, 'email nickname' /*Campos a mostrar*/ )
        .skip(from)
        .limit(limit)
        .exec((err, userList) => {
            if (err) {
                return res.status(400).json({
                    status: 'Error',
                    err
                });
            }

            res.json({
                status: 'Ok',
                count: userList.length,
                user: userList,
            });
        })
});


//POST (CREATE USER)
app.post('/user', function(req, res) {

    let inputData = req.body;

    let user = new UsuarioDB({
        name: inputData.name,
        nickname: inputData.nickname,
        email: inputData.email,
        password: bcrypt.hashSync(inputData.password, 10),
        role: inputData.role
    });

    user.save((err, userSaved) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                err
            });
        }

        res.json({
            status: 'Ok',
            user: userSaved
        });
    });
});

//PUT (UPDATE USER)
app.put('/user/:id', verifyToken, function(req, res) {
    let id = req.params.id;

    let newData = _.pick(req.body, ['name', 'google', 'nickname']); //Especificar parametros Actualizables

    UsuarioDB.findByIdAndUpdate(id, newData, { new: true, runValidators: true }, (err, userUpdated) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                err
            });
        }

        if (!userUpdated) {
            return res.status(400).json({
                status: 'Error',
                err: 'User Not Found'
            });
        }

        res.json({
            status: 'Ok',
            user: userUpdated
        });
    });

});


//PUT (DISABLE USER)
app.put('/userState/:id', verifyToken, function(req, res) {
    req.body.state = false;

    let newData = _.pick(req.body, ['state']); //Especificar parametros Actualizables

    UsuarioDB.findByIdAndUpdate(req.params.id, newData, { new: true, runValidators: true }, (err, userUpdated) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                err
            });
        }

        if (!userUpdated) {
            return res.status(400).json({
                status: 'Error',
                err: 'User Not Found'
            });
        }

        res.json({
            status: 'Ok',
            msg: 'User Disabled'
        });
    });

});


//DELETE
app.delete('/user/:id', [verifyToken, verifyRole], function(req, res) {
    let id = req.params.id;

    UsuarioDB.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                status: 'Error',
                err: 'User Not Found'
            });
        }

        res.json({
            status: 'Ok',
            msg: 'User Deleted'
        });
    });

});

module.exports = app;