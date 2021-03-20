# ExpenseWeb

## Prerequisite
Download and install [Docker](https://www.docker.com/products/docker-desktop)

## local build
You can build locally by running `docker-compose up -d` in the root directory.
Each Dockerfile in the repo will be built, which will be named as `expenseweb_<container>`.
### WebUI
navigate to `http://localhost:3000`

#### Existing TestUser Details
`username`: testauto@gmail.com  
`password`: Password1

### SwaggerUI
navigate to `http://localhost:8080`

### Other docker commands
```bash
# To stop the project
docker-compose stop
# To stop the project and remove containers
docker-compose down
# To remove all images
docker-compose down --rmi all
```

## Application Overview:

The application allows users to manage their daily expenses, you can get registered in the application and add your daily expenses, it will store your expense details.

> Your engineering squad would like to know more about the user experience and the state of the application. Please explore the webapp and report any issues that you find.

> While reviewing the source code you identified there isn't any test automation frameworks, and you decided to add  it. Add any executable tests/test framework in any language of your preference. Do your best to demonstrate your automation skills.

> Highlight how and when you expect these automated tests to be executed within a release cycle.

> You have been asked to consider the future product or engineering roadmap of this application. What are some recommendations that you would make to improve this application and why?

**Remember that this is an opportunity for you to showcase your skills.**