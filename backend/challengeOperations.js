const dynamodb = require('./awsConfig');

function createChallenge(challengeId, type, title, subtitle, description, isFeatured, reward, imgUrl) {
  const params = {
    TableName: "Challenges",
    Item: {
      "challengeId": challengeId,
      "type": type,
      "title": title,
      "subtitle": subtitle,
      "description": description,
      "isFeatured": isFeatured,
      "reward": reward,
      "imgUrl": imgUrl
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err) {
      console.log("Error creating challenge", err);
    } else {
      console.log("Challenge created successfully", data);
    }
  });
}

module.exports = { createChallenge };
