# Getting Started

-Duplicate the `.sample.env` file in the project's root directory and change its name to `.env.`

-Ensure to generate unique API keys for the New York Times, News API, and Guardian News.

-Paste each API key into its designated location in the .env file.

### `Docker Setup:`

-docker build -t news-image:1.0 .

-docker run -d -p 8080:80 news-image:1.0

-open a web browser and navigate to http://localhost:8080 to view the application.

### `Yarn Setup:`

-Run `yarn install` to install dependencies.

-Start the application in development mode using yarn start.

-The app will be accessible at http://localhost:3000 in your browser.
