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
    return output;
}

function createLearnerObject(learnerID, ag, submissions) {
    let output = {}
    output.id = learnerID;
/**result.avg = */calculateAverage(learnerID, ag, submissions);
    return output;

}

function calculateAverage(learnerID, ag, submissions) {
    let output = {};
    output.avg = 0;
    let top = 0;
    let bottom = 0;
    let assignmentCounter = 1;
    let submissionCounter = 1;
    console.log(output);
    let submitted = findSubmissions(submissions, learnerID);
    let assignments = ag.assignments;
    // console.log("THIS WAS SUBMITTED:::::",submitted)
    // console.log("filter below")
//    console.log(submitted[0]);
 //   console.log(ag);
    // console.log(submitted.filter((submissions) => {
    //    return submissions.assignment_id === ag.assignments[0].id
    // }))
    console.log("While starts");
    while (assignmentCounter <= assignments.length) {
        //console.log(ag.assignments[assignmentCounter-1])
        let submissions = submitted.filter((submissions) => {
            return submissions.assignment_id === assignments[assignmentCounter-1].id
         })
         if(submissions.length === 0){
            break;
         }
         console.log("HERE IS SUBMISSIONS",submissions);
         if(assignments[assignmentCounter].due_at )
         output[assignments[assignmentCounter-1].id] = submissions[0].submission.score/assignments[assignmentCounter-1].points_possible;
         
         top += submissions[0].submission.score;
         bottom += assignments[assignmentCounter-1].points_possible;
        assignmentCounter += 1;
    }
    console.log(output.avg);
    output.avg = top/bottom;
    console.log(output)
}

function findSubmissions(submissions, learnerID) {
    let output = submissions.filter((submissions) => {
        return submissions.learner_id == learnerID;
    });

    return output;
}

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    // console.log("ag\n", ag);
    // console.log("course\n",course);
    // console.log("submissions\n",submissions);

    //first check if course id matches ag course_id

    if (!validateID(course, ag)) {
        return;
    };
    let myResult = [];

    console.log("assignment group course id:", ag.course_id);
    console.log("course id", course.id);


    let learnerIDArray = obtainLearnerID(submissions);
    //console.log(learnerIDArray);


    myResult = createResult(learnerIDArray, ag, submissions);
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

    return result;
}
// 
// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// 
// console.log(result);
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);