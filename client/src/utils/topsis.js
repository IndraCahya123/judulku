export const topsis = (data, bobot) => {
    let arrayData = [];
  for (let rows = 0; rows < data.length; rows++) {
    arrayData[rows] = [];
    for (let col = 0; col < data[rows].length; col++) {
      arrayData[rows].push(data[rows][col].value);
    }
  }

  let matriksNormalisasiTranspose = [];

  for (let rows = 0; rows < arrayData[0].length; rows++) {
    matriksNormalisasiTranspose[rows] = [];
    for (let cols = 0; cols < arrayData.length; cols++) {
      matriksNormalisasiTranspose[rows].push(arrayData[cols][rows]);
    }
  }

  let matriksNormalisasiDivider = [];
  for (let rows = 0; rows < matriksNormalisasiTranspose.length; rows++) {
    let kuadrat = 0;
    for (
      let cols = 0;
      cols < matriksNormalisasiTranspose[rows].length;
      cols++
    ) {
      kuadrat +=
        matriksNormalisasiTranspose[rows][cols] *
        matriksNormalisasiTranspose[rows][cols];
    }
    matriksNormalisasiDivider.push(Math.sqrt(kuadrat));
  }

  let matriksNormalisasiTranspose2 = [];
  for (let rows = 0; rows < matriksNormalisasiTranspose.length; rows++) {
    matriksNormalisasiTranspose2[rows] = [];
    for (
      let cols = 0;
      cols < matriksNormalisasiTranspose[rows].length;
      cols++
    ) {
      const hasilBagi =
        matriksNormalisasiTranspose[rows][cols] /
        matriksNormalisasiDivider[rows];
      matriksNormalisasiTranspose2[rows].push(hasilBagi);
    }
  }

  let matriksNormalisasi = [];

  for (let rows = 0; rows < matriksNormalisasiTranspose2[0].length; rows++) {
    matriksNormalisasi[rows] = [];
    for (let cols = 0; cols < matriksNormalisasiTranspose2.length; cols++) {
      matriksNormalisasi[rows].push(matriksNormalisasiTranspose2[cols][rows]);
    }
  }

  let matriksNormalisasiTerbobot = [];

  for (let rows = 0; rows < matriksNormalisasi.length; rows++) {
    matriksNormalisasiTerbobot[rows] = [];
    for (let cols = 0; cols < matriksNormalisasi[rows].length; cols++) {
      const hasilKali = matriksNormalisasi[rows][cols] * bobot[cols];
      matriksNormalisasiTerbobot[rows].push(hasilKali);
    }
  }

  let matriksNormalisasiTerbobotTranspose = [];

  for (let rows = 0; rows < matriksNormalisasiTerbobot[0].length; rows++) {
    matriksNormalisasiTerbobotTranspose[rows] = [];
    for (let cols = 0; cols < matriksNormalisasiTerbobot.length; cols++) {
      matriksNormalisasiTerbobotTranspose[rows].push(
        matriksNormalisasiTerbobot[cols][rows]
      );
    }
  }

  const nilaiIdealPositif = matriksNormalisasiTerbobotTranspose.map((rows) => {
    //sort the biggest number
    const max = rows.sort((a, b) => b - a);
    return max[0];
  });

  const nilaiIdealNegatif = matriksNormalisasiTerbobotTranspose.map((rows) => {
    //sort the lowest number
    const max = rows.sort((a, b) => a - b);
    return max[0];
  });

  let jarakIdealPositif = [];

  for (let rows = 0; rows < matriksNormalisasiTerbobot.length; rows++) {
    let hasilPenjumlahanKuadrat = 0;
    for (let cols = 0; cols < matriksNormalisasiTerbobot[rows].length; cols++) {
      hasilPenjumlahanKuadrat +=
        (nilaiIdealPositif[cols] - matriksNormalisasiTerbobot[rows][cols]) *
        (nilaiIdealPositif[cols] - matriksNormalisasiTerbobot[rows][cols]);
    }
    jarakIdealPositif.push(Math.sqrt(hasilPenjumlahanKuadrat));
  }

  let jarakIdealNegatif = [];
  for (let rows = 0; rows < matriksNormalisasiTerbobot.length; rows++) {
    let hasilPenjumlahanKuadrat = 0;
    for (let cols = 0; cols < matriksNormalisasiTerbobot[rows].length; cols++) {
      hasilPenjumlahanKuadrat +=
        (matriksNormalisasiTerbobot[rows][cols] - nilaiIdealNegatif[cols]) *
        (matriksNormalisasiTerbobot[rows][cols] - nilaiIdealNegatif[cols]);
    }
    jarakIdealNegatif.push(Math.sqrt(hasilPenjumlahanKuadrat));
  }

  let nilaiAkhir = [];
  for (let rows = 0; rows < jarakIdealPositif.length; rows++) {
    const hasil =
      jarakIdealNegatif[rows] /
      (jarakIdealNegatif[rows] + jarakIdealPositif[rows]);
    nilaiAkhir.push(parseFloat(hasil.toPrecision(3)));
  }

  const AnalyzedData = {
    matriks : arrayData,
    matriksTernormalisasi: matriksNormalisasi,
    matriksNormalisasiTerbobot: matriksNormalisasiTerbobot,
    jarakIdealNegatif,
    jarakIdealPositif,
    nilaiAkhir
  }

  return AnalyzedData;
}