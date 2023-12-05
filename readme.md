# SBA 308 Javascript Fundamentals

This assignment was used to guage my understanding of fundamental JavaScript concepts and my ability to apply these concepts in a practical manner.

In this assignment I was able to
- Employ basic JavaScript syntax accurately
- Implement control flow structures such as conditionals and loops effectively
- Use arrays and objects to organize and manage data.
- Develop functions to create reusuable code
- Utilize loops and iterations to navigate through data collections
- Implement error handling to manage potential code failures gracefully

# Task
The task was to create a script that gathers data, processes it and then outputs a consistent result as described by a specification. Here we were given three objects shown in the code and asked to parse through the objects to retrieve the data and present it in a different way.

Below I will detail the functions I made and how they work.

##### function validateID(course, ag)
- validateID takes a course object and an assignment group object and returns a boolean
- It checks to see if both of these objects have matching IDs
- If they dont, an error is thrown letting the user know the IDs do not match

##### function obtainLearnerID(submissions)
- obtainLeanerID takes a submissions object and returns an array
- the array contains all the ids of learners that provided submissions

##### function createResult(learnerIDArray, ag, submissions)
- createResult takes in a learnerIDArray array, an assignment group object and a submissions object and returns an array of objects.
- This function utilizes createLearnerObject in order to create objects that will go into the array
- It loops through all the ID's in the learnerIDArray to make sure each learner is being accounted for

##### function createLearnerObject(learnerID, ag, submissions)
- createLearnerObject takes in a learnerID number, an assignment group object and a submissions object and returns an object
- The user id is placed into the object.
- Then the function calculateAverage is used to populate the other values in the object
- This function then returns an object with all the grades the user received for past due assignments as well as their total average

##### function calculateAverage(learnerID, ag, submissions)
- calculateAverage takes in a learnerID, an assignment group object and a submissions object. Then returns an object
- This is where all of the mathematical calculations are done. 
- Going forward it might be better to utilize more variable names to avoid a lot of the indexing that is done
- This functions iterates through all the assignments and matches them up to the appropriate submission
- If there is no submission and the assignment is due, a 0 is assigned. 
- Each assignment score is tracked as long as the due date has passed
- The average is then calculated and then the object is returned back to the createLearnerObject function

##### function findSubmissions(submissions, learnerID)
- This function takes in a submissions object and a learnerID and returns an array.
- This array contains all the submissions made by that specific learner ID
