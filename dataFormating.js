const fn = require("fs");
const csv = require("csv-parser");
const jsonfile = require("jsonfile");
const names = [
  "Annual-Rain-All-Years",
  "bangladesh_slums_total (1)",
  "Month-FiveYears",
  "PThreeYears",
];
names.forEach((name) => {
  const outputFile = `exports/${name}.json`;
  const output = { data: [] };
  fn.createReadStream(`data/${name}.csv`)
    .pipe(csv())
    .on("data", (row) => {
      output.data.push(row);
    })
    .on("end", function () {
      jsonfile.writeFile(outputFile, output, { spaces: 2 }, function (err) {
        console.log("All done!");
      });
    });
});
