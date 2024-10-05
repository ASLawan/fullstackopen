# Full Stack Open

This is a course i will be taking for the next 6 months.

## Part 0

Introduction to basic operations of client-server model in traditonal and modern web applications.

## Part 1

### Introduction to React

Part 1 of the course has been amazing. The concepts and principles in **React** were explained and amazing examples used to illustrate these concepts.

I got to learn about:

- Components
- State
- Hookes
- Props
- Some **React** dos and don'ts

Having completed all the tasks for part one based off of my own inderstanding makes me feel confident.

Excited to move to part 2.

## Part 2

### Advanced Concepts in React

Part 2 is an interesting part in this course and well organised. It introduced me to advance concepts in react.
Here i learned and fully understood:

- useState
- useEffect

### CSS styling

This part of the course aslo introduced me to css styling of React applications

### Backend introduction

Using **json-server** i learned how to retrieve data from the backend and render it on the front end

### Tasks:

To complete this part i have built three applications:

- Notes applications that displays notes based on importance value
  - The importance value can be toggled to true of false
- Phonebook application
  - This application emcompasses all CRUD operations as well as a search feature
  - Makes use of json-server to retrive data from backend
  - Alerts user with a notification after each CRUD operation
- Country information
  - This application provides a UI for you to get basic information for a country such as by typing the name in the search field.
  - Makes use of **https://studies.cs.helsinki.fi/restcountries/** to get the country information

## Part 3

## Part 4

### User management and Token-based login

This part has really been so interesting. It delved deeper into backend (server-side) programming.
This part adds more flesh and functionality to the applications developed in part two.

Every web application will likely have users. More often than not, these users will have the possibility to carry out certain actions (CRUD operations)

#### User management

Under user management, I learned how to:

- create users,
- correctly setup the database model,
- hash passwords and stored tha hash and not plain text
  To hash the password, I used bcrypt's hash function to scramble the plain text alongside a salt.

#### Token based login

After creating users, we need to have them login as well as determine what they can and cannot do

- Using bcrypt's compare function, we securely log in users by comparing the hash of the password they supply ast login to what is in the database
  Users can create, update and delete but we need to mate sure that this happens under the right priviledges
- To ensure that only authenticated and authorized users can do the above, I used **jsonwebtoken** to create a token and associate it with the user in question upon login.
- To improve the security of the application, each generated token can be given a validity period after which it expires and the user is expected to login again in order to get their priviledges back

#### Tests - Unit and Integration

Part of what I learned in this part 4 was testing which i found interesting. Testing proved very useful and helped me to understand much better how the application works.

- Unit tests are implemented to test a part of the application to ensure its working as expected/intended.
- Integration tests on the other hand tests two or more parts of the application to ensure everything works fine.

### Project Task: Blog post application

To complete this part I built the **api** to the **blog post application** that implements the above mentioned concepts.

- Blogs api endpoints

  - GET http://localhost:3003/api/blogs
  - POST http://localhost:3003/api/blogs
  - PUT http://localhost:3003/api/blogs/id
  - DELETE http://localhost:3003/api/blogs/id

- Users api endpoints.
  - GET http://localhost:3003/api/users
  - POST http://localhost:3003/api/users
  - PUT http://localhost:3003/api/users/id
  - DELETE http://localhost:3003/api/users/id

#### Tests

Each blog posts is associated with a given user and only authenticated and authorized users are allowed to create, delete or update blog posts

To ensure that all endpoints work as intended and all security measures work as intended, both unit and integration tests were written and tests run.

## Part 5

Part 5 has been the most difficult since i started the course but I am happy and made it through with it.
Here I was working with testing blog application to ensure it works as intended. The following tests were implememnted:

- Unit tests
- Integration tests
- End-to-end tests

### Unit Tests

These tests have to do with testing a unique aspect of the application to ensure it works as intended. Unit tests often are based on one particular aspect of the application, it could be a feature or a function responsible for a given feature.

### Integration Tests

Integration tests are an upgrade to **unit tests**. Integeration tests as the name suggests, integrate/combine two more features of the application the tests if they can/are working together as intended without any errors.

### End-to-end Tests

Also known as **E2E** tests, these tests are an upgrade to the integration tests. Unlike unit and integration tests. E2E tests simulate the end-user usage of the application. These tests when done right, mimic real life usage of the application as a whole unit and not just aspects or features of it.

To carry these tests, there exists special softwares or libraries that make these possible such as:

- Cypress
- Playwrite
- Selenium

In this case, we used **Playwrite** to implement the **E2E** tests for the blog post application.

## Part 6
