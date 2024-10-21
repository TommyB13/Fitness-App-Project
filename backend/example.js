const { createUser } = require('./userOperations');
const { createChallenge } = require('./challengeOperations');
const { createPost } = require('./postOperations');

// Example usage
createUser(
  "cognito-user-id",   // userId from Cognito
  "John Doe",          // name
  0,                   // points
  [],                  // empty list for challenges
  new Date().toISOString(),  // createdDate
  0,                   // consecutiveDays
  "https://example.com/image.jpg"  // imageUrl
);

createChallenge(
  "unique-challenge-id", // challengeId
  "workout",             // type
  "30-Day Fitness Challenge", // title
  "Get fit in 30 days",  // subtitle
  "Complete daily workouts to improve your fitness.", // description
  true,                  // isFeatured
  "200 points",          // reward
  "https://example.com/challenge-image.jpg" // imgUrl
);

createPost(
  "unique-post-id",      // postId
  "cognito-user-id",     // userId
  "challenge-id",        // challengeId
  "https://example.com/post-image.jpg",  // imgUrl
  "Completed 50% of today's workout!",   // content
  false,                // completed (not fully completed yet)
  50,                   // percentage
  []                    // comments (empty initially)
);
