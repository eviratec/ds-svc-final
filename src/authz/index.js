

module.exports = function (db) {

  const v4uuid = require("uuid/v4");

  return {
    registerOwnership: function registerOwnership (ResourceUri, OwnerId) {
      return new Promise((resolve, reject) => {
        let resourceId;
        createResource(ResourceUri)
          .then(function (resource) {
            resourceId = resource.get("Id");
            return createResourceOwner(resourceId, OwnerId);
          })
          .then(function () {
            resolve(resourceId);
          })
          .catch(reject);
        });
    },
    verifyOwnership: function verifyOwnership (ResourceUri, OwnerId) {
      return new Promise((resolve, reject) => {
        getResourceByUri(ResourceUri)
          .then(function (resource) {
            resource = resource.at(0);
            if (OwnerId === resource.related("Owner").get("OwnerId")) {
              return resolve(resource.get("Uri"));
            }
            reject(new Error("Verification Failed"));
          })
          .catch(function (err) {
            reject(new Error("Verification Failed: " + err.message));
          });
      });
    },
  };

  function createResourceOwner (ResourceId, OwnerId) {
    let res = new db.ResourceOwner({
      Id: v4uuid(),
      ResourceId: ResourceId,
      OwnerId: OwnerId,
      Created: Date.now(),
    });
    return res.save();
  }

  function createResource (ResourceUri) {
    let res = new db.Resource({
      Id: v4uuid(),
      Uri: ResourceUri,
      Created: Date.now(),
    });
    return res.save();
  }

  function getResourceByUri (uri) {
    return new Promise((resolve, reject) => {
      db.fetchResourceByUri(uri)
        .then(function (resource) {
          resolve(resource);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  }

}
