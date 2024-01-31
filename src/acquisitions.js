import Chart from "chart.js/auto";
import gasReport from "./gasReport.json";

(async function () {
  const Lamdas = ["λ1024", "λ2048", "λ3072"];
  const Colors = ["rgb(255,0,0)", "rgb(0,128,0)", "rgb(0,0,255)"];
  const Ts = ["T2^20", "T2^21", "T2^22", "T2^23", "T2^24", "T2^25"];
  const gasCostsCommitRecover = gasReport["gasCostsCommitRecover"];
  const datasets = [];
  for (let i = 0; i < gasCostsCommitRecover.length; i++) {
    const eachLambda = gasCostsCommitRecover[i];
    datasets.push({
      label: Lamdas[i],
      data: [],
      backgroundColor: Colors[i],
    });
    for (let j = 0; j < eachLambda.length; j++) {
      const temp = eachLambda[j];
      const key = Lamdas[i] + Ts[j];
      const data = temp[key];
      for (let k = 0; k < data.length; k++) {
        const gasUsed =
          data[k]["verifyRecursiveHalvingProofForSetupInternalGasUsed"];
        // console.log(Lamdas[i]);
        // console.log(Ts[j].substring(1));
        // console.log(gasUsed);
        // console.log(Colors[i]);
        datasets[i].data.push({
          x: Ts[j].substring(1),
          y: gasUsed,
        });
      }
    }
  }
  console.log(datasets);

  const data = {
    datasets: datasets,
  };
  const config = {
    type: "scatter",
    data: data,
    options: {
      elements: {
        point: {
          radius: 3,
          hoverRadius: 4, // ex.: to make it bigger when user hovers put larger number than radius.
        },
      },
      scales: {
        x: {
          type: "category",
          labels: ["", "2^20", "2^21", "2^22", "2^23", "2^24", "2^25", ""],
        },
      },
    },
  };

  new Chart(document.getElementById("acquisitions"), config);
})();
