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

function obtainLearnerID(submissions){
    output = []
    for (i in submissions) {
        if (!(output.indexOf(submissions[i].learner_id) !== -1)) {

            output.push(submissions[i].learner_id);
        }
    }
    return output;

}


function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    // console.log("ag\n", ag);
    // console.log("course\n",course);
    // console.log("submissions\n",submissions);

    //first check if course id matches ag course_id

    if(!validateID(course, ag)){
        return;
    };
    let myResult = [];

    console.log("assignment group course id:", ag.course_id);
    console.log("course id", course.id);


    let learnerIDArray = obtainLearnerID(submissions);
    console.log(learnerIDArray);
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