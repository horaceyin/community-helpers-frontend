// for HomeScreen.js

const dataTimeSeparator = "$";

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date) => {
  const dateTime =
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-") +
    dataTimeSeparator +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":");

  return dateTime.split(dataTimeSeparator);
};

const formatJobs = (jobs, isLogin, jobsPics) => {
  return jobs.map((job) => {
    // **********************************************
    // id, title, price, images(handle later), location, description, helpSeeker, helperRating, (isLike, isDislike for isLogin is true) can remain the same
    // category, creationDatetime, helpRequestDatetime, images need to be converted
    // handle the case if type of category changes
    let retJob = JSON.stringify(job);
    retJob = JSON.parse(retJob);

    retJob.image = jobsPics[Math.floor(Math.random() * jobsPics.length)];
    // helperSeeker display name
    console.log("creating a job");

    const [helpRequestDate, helpRequestTime] = formatDate(
      new Date(job.helpRequestDatetime)
    );
    const [creationDate, creationTime] = formatDate(
      new Date(job.creationDatetime)
    );

    retJob.helpRequestDate = helpRequestDate;
    retJob.helpRequestTime = helpRequestTime;
    retJob.creationDate = creationDate;
    retJob.creationTime = creationTime;
    retJob.categories = job.category.split(",");
    return retJob;
  });
};

export const createRenderDataArray = (backendData, loginState, jobsPics) => {
  return new Promise((resolve, reject) => {
    try {
      let result = formatJobs(backendData, loginState, jobsPics);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
