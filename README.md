# Starting the docker containers

```bash
docker-compose up -d
```

# Starting the app
```bash
npm run start:dev
```

# Swagger UI

http://localhost:3000/api


# Enviroment Variables

This project use Enviroment Variables to provide Keys and configuration values,
 you will be able to found a example file in the root of the project as `.env.example` with the key needed. To provide keys to the project you might need to create a copy of the example file an renamed as `.env`. **Remember** to never commit the `.env` file or any key.

Below you will find mode information about the name of the Keys and a brief description of their use in the project.

## JWT Keys

Name          | Description
--------------|--------------
JWT_TOKEN     | Is use as private key to sign the jwt
JWT_EXPIRY    | Is use to set the life of the token expressed in seconds


## EMAIL

Name                 | Description
---------------------|--------------
SENDGRID_API_KEY     | SendGrid Api key

