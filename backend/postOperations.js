const dynamodb = require('./awsConfig');

function createPost(postId, userId, challengeId, imgUrl, content, completed, percentage, comments) {
  const params = {
    TableName: "Posts",
    Item: {
      "postId": postId,
      "userId": userId,
      "challenge": challengeId,
      "imgUrl": imgUrl,
      "content": content,
      "completed": completed,
      "percentage": percentage,
      "comments": comments
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err) {
      console.log("Error creating post", err);
    } else {
      console.log("Post created successfully", data);
    }
  });
}

module.exports = { createPost };
