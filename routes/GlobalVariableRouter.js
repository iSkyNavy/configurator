function GlobalVariableRouter(expressInstance) {

  var _this = this;

  expressInstance.get('/global-variable', ["admin", "reader"], (req, res) => {
    _this.goToHomePage(req, res);
  });

  this.goToHomePage = function(req, res, redirectAttributes) {

    variableRepository.findByScopeAndDeleted("G","N", function(err, entities) {
      
      if (err) {
        logger.info(err);
        var renderAttributes = {
          error_message: "An error occurred when trying to list global variables.",
          error_security_message: req.session.error_security_message || undefined
        };        
        req.session.error_security_message = undefined;        
        
        res.render('global-variable/home.hbs', renderAttributes);
        return;
      }      

      var renderAttributes = {
        globalVariables: entities,
        error_security_message: req.session.error_security_message || undefined,
        userRole: req.session.loginInformation.role || undefined
      };
      
      req.session.error_security_message = undefined;

      Object.assign(renderAttributes, redirectAttributes);
      res.render('global-variable/home.hbs', renderAttributes);
    });
  }

  expressInstance.get('/global-variable/view/new', ["admin"], (req, res) => {
    res.render('global-variable/new.hbs', {});
  });

  expressInstance.post('/global-variable/action/save', ["admin"], (req, res) => {

    logger.info("Save global variable:");    
    req.body.scope = 'G';
    
    let objectToLog = {...req.body}; objectToLog.value = "****";
    logger.info(objectToLog);
    variableRepository.save(req.body, function(err, result) {
      if (err) {
        logger.info(err);
        res.render('global-variable/new.hbs', {
          error_message: "An error occurred when trying to save the global variable."
        });
      } else {
        _this.goToHomePage(req, res, {
          redirect: '/global-variable',
          success_message: "The global variable was saved successfully."
        })
      }
    });
  });

  expressInstance.get('/global-variable/view/edit/:id', ["admin"], (req, res) => {

   variableRepository.findOneById(req.params.id,function(err,entity){
     if (err) {
       logger.info(err);
       _this.goToHomePage(req, res, {
         error_message: "An error occurred when trying to get the global variable."
       })
     } else {
       res.render('global-variable/new.hbs', {
         global:entity
       });
     }
   });
  });

  expressInstance.get('/global-variable/view/read/:id', ["reader"], (req, res) => {

   variableRepository.findOneById(req.params.id,function(err,entity){
     if (err) {
       logger.info(err);
       _this.goToHomePage(req, res, {
         error_message: "An error occurred when trying to read the global variable."
       })
     } else {
       
       if(entity.type === 'S'){
         entity.value = "{secret}"
       }
       
       res.render('global-variable/read.hbs', {
         variable:entity
       });
     }
   });
  });


}

module.exports = GlobalVariableRouter;
