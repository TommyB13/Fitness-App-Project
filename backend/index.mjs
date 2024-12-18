import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// Define table names based on your design
const usersTable = "Users";
const postsTable = "Posts";
const challengesTable = "Challenges";
const commentsTable = "Comments";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  let headers = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': '*',
    // 'Access-Control-Allow-Headers': '*',
  };

  const userId = event.requestContext.authorizer?.jwt.claims.sub || '';
  const username = event.requestContext.authorizer?.jwt.claims.username || '';
  let userResult;
  let updateRequestJSON;

  try {
    switch (event.routeKey) {
      // POSTs routes
      case "GET /posts": // Get all posts
        body = await dynamo.send(new ScanCommand({ TableName: postsTable }));
        body = body.Items;
        break;

      case "GET /post/{id}": // Get single post
        body = await dynamo.send(
          new GetCommand({
            TableName: postsTable,
            Key: {
              postId: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;

      case "GET /posts/my": // Get my posts (assuming authenticated user)
        // Assuming you have the user's ID in event.requestContext
        body = await dynamo.send(
          new ScanCommand({
            TableName: postsTable,
            FilterExpression: "#user = :user",
            ExpressionAttributeNames: {
              "#user": "user",
            },
            ExpressionAttributeValues: {
              ":user": userId,
            },
          })
        );
        body = body.Items;
        break;

      case "GET /posts/my/{id}": // Get my single post
        body = await dynamo.send(
          new GetCommand({
            TableName: postsTable,
            Key: {
              postId: event.pathParameters.id,
              userId,
            },
          })
        );
        body = body.Item;
        break;

      case "PUT /posts/my/{id}": // Update my single post
        updateRequestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: postsTable,
            Item: {
              postId: event.pathParameters.id,
              userId,
              ...updateRequestJSON, // Merge with request body
            },
          })
        );
        body = `Updated post ${event.pathParameters.id}`;
        break;

      case "PUT /post/{id}": // Add comment to post
        updateRequestJSON = JSON.parse(event.body);

        // Step 1: Fetch user details from usersTable using userId
        userResult = await dynamo.send(
          new GetCommand({
            TableName: usersTable,
            Key: {
              userId
            },
            ProjectionExpression: "displayName, imageUrl" // Only fetch necessary attributes
          })
        );

        if (!userResult.Item) {
          throw new Error("User not found");
        }

        // Step 2: Add comment to commentsTable, including displayName and imageUrl
        await dynamo.send(
          new PutCommand({
            TableName: commentsTable,
            Item: {
              challengeId: updateRequestJSON.challengeId,
              postId: event.pathParameters.id,
              userId,
              content: updateRequestJSON.content,
              createdDate: new Date().toISOString(),
              displayName: userResult.Item.displayName,
              profileImgUrl: displayName.imageUrl
            },
          })
        );
        body = `Comment added to post ${event.pathParameters.id}`;
        break;

      case "DELETE /posts/my/{id}": // Delete my single post
        await dynamo.send(
          new DeleteCommand({
            TableName: postsTable,
            Key: {
              postId: event.pathParameters.id,
              userId,
            },
          })
        );
        body = `Deleted post ${event.pathParameters.id}`;
        break;

      case "POST /post":
        // Parse the request body to get the new post details
        let newPostRequestJSON = JSON.parse(event.body);
        let postId = uuidv4();
        
        // Step 1: Fetch user details from usersTable using userId
        userResult = await dynamo.send(
          new GetCommand({
            TableName: usersTable,
            Key: {
              userId
            },
            ProjectionExpression: "displayName, imageUrl" // Only fetch necessary attributes
          })
        );

        if (!userResult.Item) {
          throw new Error("User not found");
        }

        // Step 2: Add post to postsTable, including displayName and imageUrl
        await dynamo.send(
          new PutCommand({
            TableName: postsTable,
            Item: {
              postId,
              userId,
              challenge: newPostRequestJSON.challenge,
              completed: newPostRequestJSON.completed,
              content: newPostRequestJSON.content,
              title: newPostRequestJSON.title,
              imgUrl: newPostRequestJSON.imgUrl,
              percentage: newPostRequestJSON.percentage,
              displayName: userResult.Item.displayName,
              profileImgUrl: userResult.Item.imageUrl
            }
          })
        );

        // Return a success message
        body = `Created post ${postId}`;
        break;

      // Challenges routes
      case "GET /challenges": // Get all challenges
        body = await dynamo.send(
          new ScanCommand({ TableName: challengesTable })
        );
        body = body.Items;
        break;

      case "POST /challenges": // Create new challenge
        let newChallengeRequestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: challengesTable,
            Item: {
              challengeId: newChallengeRequestJSON.challengeId, // Assuming challenge ID is provided
              ...newChallengeRequestJSON, // Additional challenge details
            },
          })
        );
        body = `Created challenge ${newChallengeRequestJSON.challengeId}`;
        break;

      // User routes
      case "GET /me": // Get my profile
        body = await dynamo.send(
          new GetCommand({
            TableName: usersTable,
            Key: {
              userId,
            },
          })
        );
        body = body.Item;
        break;

      case "PUT /me": // Update my profile
        let updateProfileRequestJSON = JSON.parse(event.body);
        const params = {
          TableName: usersTable,
          Key: { userId },
          UpdateExpression: "",
          ExpressionAttributeNames: {},
          ExpressionAttributeValues: {},
          ReturnValues: "ALL_NEW"
        };

        let updateExpressions = [];
        if (!updateProfileRequestJSON.imageUrl) {
          updateProfileRequestJSON = {
            ...updateProfileRequestJSON,
            imageUrl: `https://ui-avatars.com/api/?name=${updateProfileRequestJSON.displayName.split(' ').join('+')}`
          };
        };

        Object.entries(updateProfileRequestJSON).forEach(([attribute, value], index) => {
          const attributeAlias = `#attr${index}`;
          const valueAlias = `:val${index}`;

          updateExpressions.push(`${attributeAlias} = ${valueAlias}`);
          params.ExpressionAttributeNames[attributeAlias] = attribute;
          params.ExpressionAttributeValues[valueAlias] = value;
        });

        params.UpdateExpression = "SET " + updateExpressions.join(", ");

        const putUserResult = await dynamo.send(new UpdateCommand(params));
        body = `Updated profile for user ${putUserResult.Attributes}`;
        break;

      case "POST /users": // Create new user
        // Check if user already exists
        const userExists = await dynamo.send(
          new GetCommand({
            TableName: usersTable,
            Key: { userId },
          })
        );

        if (userExists.Item) {
          // User already exists, return a response
          body = `User ${userId} already exists.`;
        } else {
          await dynamo.send(
            new PutCommand({
              TableName: usersTable,
              Item: {
                userId,
                displayName: username,
                challenges: [],
                consecutiveDays: 0,
                createdDate: new Date().toISOString(),
                imageUrl: `https://ui-avatars.com/api/?name=${username.split(' ').join('+')}`,
                name: username,
                points: 0,
                firstLogin: true,
              },
            })
          );
          body = `Created user ${userId}`;
        }

        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
