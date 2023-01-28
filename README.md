# Guide to run the program

## There are two ways to run the program

    - Website
    - Locally

- ### To run it on the website you can simpily visit  this [URL](https://dishant-yadav.github.io/UserData-Table/)

- ### To run it on locally these are the steps one needs to follow

  - Open the terminal

  - Paste this command  

        ``` bash
        git clone git@github.com:dishant-yadav/UserData-Table.git
        ```

  - Then move to the directory by using the cd command

        ``` bash
            cd UserData-Table
        ```

  - Then install the required node_modules by running the below command

        ``` bash
        npm install
        ```

  - After that type this command to start the localhost

        ``` bash
        npm run start
        ```

Using the  above commands will start the app on your localhost at PORT number 3000

[GithHub Link](https://github.com/dishant-yadav/UserData-Table/)

[Live Link](https://dishant-yadav.github.io/UserData-Table/)


The website opens with a header which contains a heading with title Users List and add user button.
Below this the there is a list of users fetched from the API even with the option to select from the table. Clicking on the table opens a modal with a form containing Name, Email and Avatar as required fields with proper validations with a submit button. Clicking the button will post the data to the API. 