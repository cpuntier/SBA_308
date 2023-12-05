// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function validateID(course, ag) {
    try {
        if (ag.course_id !== course.id) {
            throw "The assignments in this group do not belong to the inputted course. Please make sure they are related.";
        } else {
            console.log("Starting calculations....")
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

function obtainLearnerID(submissions) {
    output = []
    for (i in submissions) {
        if (!(output.indexOf(submissions[i].learner_id) !== -1)) {

            output.push(submissions[i].learner_id);
        }
    }
    return output;

}
function createResult(learnerIDArray, ag, submissions) {
    let output = [];
    for (let i = 0; i < learnerIDArray.length; i++) {
        //        console.log(`Looking at ID: ${learnerIDArray[i]}`)
        output.push(createLearnerObject(learnerIDArray[i], ag, submissions));
    }
    //console.log("Here is the result:",output);
    return output;
}

function createLearnerObject(learnerID, ag, submissions) {
    let output = {}
    output.id = learnerID;
   // console.log("Cheking ID,", output);
    output.avg = 0;
   // console.log("checking avg,", output)
    let calculations = calculateAverage(learnerID, ag, submissions);
    for(i in calculations){
        output[i] = calculations[i];
    }

   // console.log("checking after avg", output)
    return output;

}

function calculateAverage(learnerID, ag, submissions) {
    let output = {};
    output.avg = 0;
    let top = 0;
    let bottom = 0;
    let assignmentCounter = 1;
    //    console.log(output);
    let submitted = findSubmissions(submissions, learnerID);
    let assignments = ag.assignments;

    //console.log("While starts");
    while (assignmentCounter <= assignments.length) {
        let submissions = submitted.filter((submissions) => {
            return submissions.assignment_id === assignments[assignmentCounter - 1].id
        })
        if (submissions.length === 0) {
            break;
        }

        let dueDate = new Date(assignments[assignmentCounter - 1].due_at + "T00:00:00")
        let submitDate = new Date(submissions[0].submission.submitted_at + "T00:00:00")

        if (dueDate >= Date.now()) {
           // console.log("DATE HASNT HAPPENED YET")
            assignmentCounter += 1;
            continue;
        }

        if (dueDate >= submitDate) {
          //  console.log("IS ON TIME");
            output[assignments[assignmentCounter - 1].id] = (submissions[0].submission.score / assignments[assignmentCounter - 1].points_possible).toFixed(3);

        } else {
         //   console.log("ITS LATE");
            let deductedScore = submissions[0].submission.score - (assignments[assignmentCounter - 1].points_possible * .10)
           // console.log("Deducted score is:",deductedScore,"Points possible is:",assignments[assignmentCounter-1].points_possible);
            if (deductedScore < 0) {
                output[assignments[assignmentCounter - 1].id] = 0;
            }else{
                output[assignments[assignmentCounter -1].id] = (deductedScore/assignments[assignmentCounter-1].points_possible).toFixed(3);
            }
        }

        top += submissions[0].submission.score;
        bottom += assignments[assignmentCounter - 1].points_possible;
        assignmentCounter += 1;
    }
    output.avg = top / bottom;
    return output;
}

function findSubmissions(submissions, learnerID) {
    let output = submissions.filter((submissions) => {
        return submissions.learner_id == learnerID;
    });

    return output;
}

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.

    //first check if course id matches ag course_id

    if (!validateID(course, ag)) {
        return;
    };

    //find all the learner ids
    let learnerIDArray = obtainLearnerID(submissions);
    //console.log(learnerIDArray);


    let myResult = createResult(learnerIDArray, ag, submissions);
    console.log(myResult);
    //found ID's belonging to learners that provided submissions



    ////USE THIS LATER ITS A SURPRISE TOOL
    // console.log(submissions.filter((submission) => {
    //     return submission.learner_id == 125;
    // })
    // );


    const result = [
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];

    return myResult;
}
// 
// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// 
// console.log(result);
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);