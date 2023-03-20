// for HomeScreen.js

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};

const formatDate = (date) => {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('-') +
    '$' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
};

const formatJobs = (jobs, fetchRecommended, jobsPics) => {
  return (
    jobs.map(data => {
      var job = null;
      const retJob = {};

      retJob.id = data.id;

      if (fetchRecommended) job = data.helpRequest;
      else {
        for (var i=0; i < data.helpRequestMatchings.length; i++){
          if (data.helpRequestMatchings[i].state == "ongoing") return null;
        }
        job = data;
      }

      retJob.image = jobsPics[Math.floor(Math.random() * jobsPics.length)];
      retJob.description = job.description;
      retJob.helpSeeker = job.helpSeeker.displayName;
      retJob.location = job.location;
      retJob.price = job.price;
      retJob.title = job.title;
      retJob.categories = job.category.split(",");

      const jobDateAndTime = formatDate(new Date(job.helpRequestDatetime)).split("$");
      retJob.jobsDate = jobDateAndTime[0];
      retJob.jobsTime = jobDateAndTime[1];

      return retJob;
    })
  );
};

export const createDataArray = (backendData, state, jobsPics) => {
    //console.log(backendData[0].helpRequestMatchings)
    var result = formatJobs(backendData, state, jobsPics);
    result = result.filter(job => job != null)
    console.log(result, "555")
    return result
};