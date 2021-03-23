module.exports = (mongoose) => {
  mongoose.connect(`${process.env.mongoURL}/sessions`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("[MONGOOSE] connected!");
  });

  mongoose.set("useFindAndModify", false);
}