// import mongoose from "mongoose";

// export const connection = ()=>{
//     mongoose.connect(process.env.MONGO_URI,{
//         dbName:"JOB_PORTAL"
//     }).then(()=>{
//         console.log("connected to Database.")
//     }).catch(err=>{
//         console.log(`some error occured while connecting to db : ${err}`)
//     })
// }


import mongoose from "mongoose";
export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "SkillShare",
    })
    .then(() => {
      console.log("connected to database ");
    })
    .catch((err) => {
      console.log("some error occured with the database: ${err} ");
    });
};