const dynamodb = require('./awsConfig');

function createUser(userId, name, points, challenges, createdDate, consecutiveDays, imageUrl) {
  const params = {
    TableName: "Users",
    Item: {
      "userId": userId,
      "name": name,
      "points": points,
      "challenges": challenges,
      "createdDate": createdDate,
      "consecutiveDays": consecutiveDays,
      "imageUrl": imageUrl
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err) {
      console.log("Error creating user", err);
    } else {
      console.log("User created successfully", data);
    }
  });
}

module.exports = { createUser };
