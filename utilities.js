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
      // padTo2Digits(date.getSeconds()),
    ].join(":");

  return dateTime.split(dataTimeSeparator);
};

const formatJobs = (jobs, isLogin, jobsPics, requestIndex) => {
  return jobs.map((job) => {
    // **********************************************
    // id, title, price, images(handle later), location, description, helpSeeker, helperRating, (isLike, isDislike for isLogin is true) can remain the same
    // category, creationDatetime, helpRequestDatetime, images need to be converted
    // handle the case if type of category changes
    let retJob = JSON.stringify(job);
    retJob = JSON.parse(retJob);

    retJob.fakeImage = jobsPics[Math.floor(Math.random() * jobsPics.length)];
    retJob.images = retJob.images.length > 0 ? retJob.images[0] : null;
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
    retJob.requestIndex = requestIndex;
    requestIndex += 1;

    if (job.takenHelpRequests) {
      retJob.takenUserId = job.takenHelpRequests.map((user) => user.userId);
    }
    return retJob;
  });
};

export const createRenderDataArray = (
  backendData,
  loginState,
  jobsPics,
  requestIndex
) => {
  return new Promise((resolve, reject) => {
    try {
      let result = formatJobs(backendData, loginState, jobsPics, requestIndex);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const createDataArrayOne = (backendData, loginState, jobsPics) => {
  let parkingData = [backendData];
  return formatJobs(parkingData, loginState, jobsPics);
};
