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

## AUTHENTICATION KEYS

### Redirection URLS

Name                 | Description
---------------------|--------------
SERVER_URL           | Server url used to the callback URL
WEBSITE_URL          | Website Application URL used to redirect to site

### GOOGLE

Name                 | Description
---------------------|--------------
GOOGLE_CLIENT_ID     | Google Client ID
GOOGLE_SECRET        | Google Client Secret


### GITHUB

Name                 | Description
---------------------|--------------
GITHUB_CLIENT_ID     | Github Client ID
GITHUB_CLIENT_SECRET | Github Client Secret


### FACEBOOK

Name                 | Description
---------------------|--------------
FACEBOOK_APP_ID      | Facebook App Id
FACEBOOK_APP_SECRET  | Facebook App Secret


# Query Filters

A custom implementation to obtain and transform query parameters to TypeORM FindMany options is available through the class `FilterQuery<T>`.

## Sort

To sort in a collection is needed to include the query parameter `sort`

If we want to get a field with the name : `field_name` if we want to sort `DESC` we add `-` at the begining otherwise it will be sort`ASC`.

**Example:**
> http://localhost:3000/endpoint?sort=-field_name

## Select Fields

If we want to select only a few fields in our query we can provide the name of the fiels separated by a comma using the field `fields`.

**Example:**
> http://localhost:3000/endpoint?fields=-field_name_1,field_name2


## Pagination

When we are dealing with collections the endpoint response will have an structure similar to:

```
{
    "records": [
        ...
    ],
    "pagination": {
        "page": 1,
        "perPage": 20,
        "totalRecords": 4,
        "pageRecords": 4,
        "totalPages": 1
    }
}
```

You might need to move through the pages, for that two parameters are provided `offset` and `size`. Where `offset` provides how many records do you want to skip and `size` represent the number of items that will return per page.

**Important:** If no parameters are provide by default a `offset` of 0 and a `size` of 20 is assigned.

**Example:**

We want to get the first page with only 10 records (This mean that all our pages will only contain 10 items). Keep in mind that if you modify the size the totalPages will change.

> http://localhost:3000/endpoint?offset=0&size=10

## Search

For doing more advance search there are different way to do it using the query param `q` and provide a JSON.

### Find Exact Parameter value

To do a search and find a exact value we have to provide a JSON that might look similar to : `{ "field_name" : "value_to_search" }`.

**Example**
> http://localhost:3000/endpoint?q={"name_field" : "field_value"}

### Like Parameter value

To do a search that use the like operator we need to provide as value for our parameter key a object `{ "$like": "value_to_search"}`.

*Important:* you might need to use `%` as you were doing a like in MySQL.

**Example:**
> http://localhost:3000/endpoint?q={"name_field" : { "$like" : "%field_value"} }

## Relations

To include relations in the response it is necesary to pass the list of relations needed separated by comma using the parameter `relations`

**Example:**
> http://localhost:3000/endpoint?relations=tags,owner