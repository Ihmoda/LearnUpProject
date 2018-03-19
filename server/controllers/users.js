// //////////////////////////////////////////////////////////////////////////////////////
//  SERVER/CONTROLLERS/CONTROLLER_NAME_PLURAL.JS FILE (CONTROLLER for a MODEL ):
// ///////////////////////////////////////////////////////////////////////////////////////
// Require Mongoose module in the following files:
// - mongoose.js file,
// - HERE,
// - SCHEMA/MODEL file.
// ///////////////////////////////////////////////////////////////////////////////////////

// STEP 1 (DB/SCHEMA SETUP):
// Require Mongoose module:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// STEP 4 (DB/SCHEMA SETUP): Declare/define controller on model & export to routes.js:
// ////////////////////////////////////////////////////////////////////////////////////////
//  Retrieve a defined schema from mongoose models:
// 'User' variable object comforms to a model_instance retrieved from mongoose models.
const User = mongoose.model('User');

module.exports = {
  login(request, response) {
    User.findOne({ email: request.body.email }).then((user) => {
      if (user) {
        bcrypt.compare(request.body.password, user.hash).then((res) => {
          if (res) {
            request.session.user = user.email;
            response.json({
              email: user.email,
              admin: user.admin,
              id: user.id,
            });
          } else {
            response.json({ error: 'error' });
          }
        });
      } else {
        response.json({ error: 'error' });
      }
    });
  },
  dashboard(request, response) {
    User.findOne({ email: request.session.user }).then((user) => {
      User.find()
        .sort({ admin: -1 })
        .then((users) => {
          const userList = users.map(user => ({
            email: user.email,
            admin: user.admin,
            id: user.id,
          }));
          response.json(userList);
        });
    });
  },
  newUser(request, response) {
    User.findOne({ email: request.session.email }).then(() => {
      User.findOne({ email: request.body.email }).then((user) => {
        if (!user) {
          const admin = this.getAdminCode(request.body.admin);
          bcrypt.hash('default', 10).then((newHash) => {
            User.create({
              email: request.body.email,
              admin,
              hash: newHash,
            }).then((newUser) => {
              const { email, admin, id } = newUser;
              const userResult = {
                email,
                admin,
                id,
              };
              response.json(userResult);
            });
          });
        } else {
          response.json({ error: 'error' });
        }
      });
    });
  },
  editUser(request, response) {
    User.findOne({ email: request.session.user }).then((adminUser) => {
      User.findOne({ email: request.body.email }).then((updateUser) => {
        if (updateUser) {
          bcrypt.hash(request.body.password, 10).then((newHash) => {
            const admin = this.getAdminCode(request.body.admin);
            if (adminUser.admin > updateUser.admin) {
              updateUser.hash = newHash;
              updateUser.admin = admin;
              updateUser.save().then((editedUser) => {
                const { email, admin, id } = editedUser;
                const userResult = {
                  email,
                  admin,
                  id,
                };
                response.json(userResult);
              });
            } else {
              response.json({ error: 'error' });
            }
          });
        } else {
          response.json({ error: 'error' });
        }
      });
    });
  },
  getAdminCode(adminString) {
    let admin;
    switch (adminString) {
      case 'Admin':
        admin = 9;
        break;
      case 'Teacher':
        admin = 8;
        break;
      default:
        admin = 8;
    }

    return admin;
  },
  promote(request, response, type) {
    User.findOne({ email: request.session.user }).then((adminUser) => {
      User.findOne({ _id: request.params.id }).then((user) => {
        if (adminUser.admin > user.admin && user.admin + type < 10 && user.admin + type > 7) {
          user.admin += type;
          user.save().then((savedUser) => {
            const promotion = type < 0 ? 'demoted' : 'promoted';
            response.json({ message: `Successfully ${promotion} ${savedUser.email}.` });
          });
        } else {
          response.json({ error: 'error' });
        }
      });
    });
  },
  delete(request, response) {
    User.findOne({ email: request.session.user }).then((adminUser) => {
      User.findOne({ _id: request.params.id }).then((user) => {
        if (adminUser.admin > user.admin) {
          User.remove({ _id: user.id })
            .then(() => {
              response.json({ message: `Successfully deleted ${user.email}.` });
            })
            .catch(error => console.log(error));
        } else {
          response.json({ error: 'error' });
        }
      });
    });
  },
  enterRoom(request, response) {
    User.findOne({ _id: request.params.id })
      .then((user) => {
        if (user) {
          let isadmin;
          if (request.session.user) {
            isadmin = true;
          } else {
            isadmin = false;
          }
          const tiles = require('../../static/tiles.json');
          response.render('board', {
            id: user.id,
            admin: isadmin,
            prefixes: tiles.sidetwo.prefixes,
            endingsright: tiles.sidetwo.endingsright,
            endingsbottom: tiles.sidetwo.endingsbottom,
            roots: tiles.sidetwo.roots,
            starstop: tiles.sideone.starstop,
            starsleft: tiles.sideone.starsleft,
            starsright: tiles.sideone.starsright,
            starsbottom: tiles.sideone.starsbottom,
            dipper: tiles.sideone.dipper,
            crescent: tiles.sideone.crescent,
            earth: tiles.sideone.earth,
          });
        } else {
          response.redirect('admin');
        }
      })
      .catch((error) => {
        console.log(error);
        response.redirect('/admin');
      });
  }, // <--- ADD ADDITIONAL METHODS SEPARATED BY A COMMA ','
};
