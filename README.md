# Petite Pawlour

The Petite Pawlour is a pet grooming salon that caters to dogs, cats, and other small animals such as rabbits and guinea pigs. They're a wonderful option for pet owners looking for a reliable and caring place to groom their furry friends. Allow customers to request grooming services provided and have email confirmations sent out. Website includes an admin dashboard for easy viewing of service requests from the database.

![Petite Pawlour pet grooming site](https://github.com/yiremorlans/petite-parlour/blob/main/pp_land.png)

## Getting Started:

**Tech used:** JavaScript, Express, Node.js, Express-react-views (as templating engine), MongoDB, HTML, CSS

To get the project running on your local machine, you will need Node.js and the following installation guide to get started.

### Prerequisites

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yiremorlans/petite-parlour.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Sign up for your own non-relational document database at [https://www.mongodb.com/](MongoDB)
4. Enter your port and database string inside the `.env` file
   ```sh
    PORT = 2121 (can be any port example: 3000)
    MONGODB_URI = `your database URI`
   ```
5. Run the app on localhost:YOURPORT
    - For hot reload with new changes try:
    **requires node v. 19+**
    ```sh 
    node --watch server
    ```
    OR run with
    ```sh
    npm start
    ```
![Petite Pawlour admin dashboard](https://github.com/yiremorlans/petite-parlour/blob/main/pp_dash.png)

 My aim is to make the pet grooming process easier and more accessible for pet owners, while also streamlining the appointment booking and confirmation process. The website will utilize nodemailer, an email sending module, to send confirmation emails to customers once they've booked their appointments. An off-the-shelf solution is Nodemailer, a popular Node.js module for sending emails from your application. It provides a simple and flexible API that allows you to send emails using SMTP, sendmail, or even your own custom transport. Check out the [Nodemailer](https://nodemailer.com/about/) docs for hooking up your provider. 
 
 In addition to the online appointment booking and confirmation system, the website will also include an admin dashboard. This dashboard will allow the groomer to easily check and manage their upcoming appointments. The dashboard will display all the relevant appointment details such as the date, time, grooming service requested, and the customer's contact information. This feature will help the groomer to stay organized and on top of their schedule, ensuring that all appointments are properly managed and attended to. Overall, the website aims to provide a seamless and user-friendly experience for both pet owners and groomers alike.

## Optimizations

Admin login to be implemented to keep appointment details private. Email list signup in the works.

## Lessons Learned:

Some new challenges involved research for implementing a feature for sending email confirmations for booked services. Using React as a templating engine allowed me to work with familiar .jsx syntax but required a bit of work around to apply stylesheets since express-react-views does not support importing stylesheets the react-app way. 
