/* as an object, instead of an array, because it 
takes less ressources to look for a key in an objects 
rather that find an elementin an array */

const forbiddenUsername = {
    recoverpwd: 1,
    recover: 1,
    emailverify: 1,
    info: 1,
    profile: 1,
    editsettings: 1,
    kinkograph: 1,
    admin: 1,
    guest: 1,
  };

module.exports = forbiddenUsername;
  