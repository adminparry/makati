const router = require('express').Router();
const List = require('../model/list');


router.get('/profile.do', (req, res) => {
    res.render('test')
})

router.get('/list.api', (req, res) => {
    
    List.findAll().then(ret => {
        res.json({ret})
    }).catch(err => {
        res.json({err: '查询失败'})
    });
    
})
module.exports = router;