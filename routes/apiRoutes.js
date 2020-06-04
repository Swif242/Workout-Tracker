const router = require("express").Router();
const workout = require("../models/workout.js");

// get all workouts
router.get("/api/workouts", (req, res) => {
  workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});
// post new workout 
router.post("/api/workouts", async (req, res) => {
  try {
    const response = await workout.create({ type: "workout" })
    res.json(response);
  }
  catch (err) {
    console.log("Error occurred creating a workout: ", err)
  }
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  const workoutId = params.id;
  let savedExercises = [];

  workout.find({ _id: workoutId })
    .then(dbWorkout => {
      savedExercises = dbWorkout[0].exercises;
      res.json(dbWorkout[0].exercises);
      let allExercises = [...savedExercises, body]
      console.log(allExercises)
      updateWorkout(allExercises)
    })
    .catch(err => {
      res.json(err);
    });

// update workout
  function updateWorkout(exercises) {
    workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
      if (err) {
        console.log(err)
      }
    });
  };
});


router.get("/api/workouts/range", (req, res) => {
  workout.find({})
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;