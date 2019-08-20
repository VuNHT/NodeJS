const express = require('express');

const  user_controller = require('./user.controller');
const {UserValidator} = require('./validator');

const router = express.Router();


const data_controller = require('./data.controller');

// function requiresLogout(req, res, next){
//     if (req.session && req.session.user) {
//         return res.json({err: 'You must be Logout in to Login continue'});        
//     } else {
//         return next();
//     }
// }
// router.get('/jwt', user_controller.jwt);
// router.get('/secret', user_controller.secret);



router.post('/login', user_controller.login);
router.post('/register', user_controller.register)

router.get('/testData', user_controller.secret, data_controller.getData);
router.get('/testDataJoin', data_controller.getDataJoin);
router.post('/testData', data_controller.addData);
router.delete('/testData/:id', data_controller.deleteData);
router.put('/testData/:id', data_controller.editData);


module.exports = router;