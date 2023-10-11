module.exports = (mongoose) => {
  const Betest = mongoose.model(
    "betest",
    mongoose.Schema(
      {
        id: String,
        userName: String,
        accountNumber: String,
        emailAddress: String,
        identityNumber: String,
      },
      { timestamps: true }
    )
  );

  return Betest;
};
