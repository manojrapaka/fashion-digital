import csv from 'csv-parser';
import * as https from 'https';

let results: any = [];
export const download = async (urls: string[]) => {
  const promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const datas: any = [];
      https.get(url, (response) => {

        response.pipe(csv()).on('data', (data) => {
          datas.push(data);
        });

        response.on('end', () => {
          resolve(datas);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  });

  Promise.all(promises).then((datas) => {
    console.log(...datas);
  }).catch((error) => {
    console.error(error);
  });

}

export const reduceMax = (data: any[]) => {

  if (data.length <= 0) return { 'Speaker': null };

  return data.reduce((maxItem: any, currentItem: any) => {
    if (currentItem.Count > maxItem.Count) {
      return currentItem;
    }
    return maxItem;
  })
}

export const reduceMin = (data: any[]) => {
  return data.reduce((minItem: any, currentItem: any) => {
    if (currentItem.Count < minItem.Count) {
      return currentItem;
    }
    return minItem;
  })
}

export const groupAndCount = (array: any, keyStr: string) => {
  const grouped: any = {};

  array.forEach((item: any) => {
    const key = `${item[keyStr]}`;
    if (!grouped[key]) {
      grouped[key] = {
        [keyStr]: item[keyStr],
        Count: 1
      };
    } else {
      grouped[key].Count++;
    }
  });

  return Object.values(grouped);
}

export const groupAndSum = (data: any[]) => {
  const wordSumBySpeaker: any = {};

  data.forEach((item: any) => {
    const speaker: any = item.Speaker;
    const words: any = parseInt(item[' Words'].trim()); // " Words" değerini sayıya çevir

    if (!isNaN(words)) {
      if (!wordSumBySpeaker[speaker]) {
        wordSumBySpeaker[speaker] = 0;
      }
      wordSumBySpeaker[speaker] += words;
    }
  });

  const wordSumArray = Object.keys(wordSumBySpeaker).map(speaker => ({
    Speaker: speaker,
    Count: wordSumBySpeaker[speaker]
  }));

  return wordSumArray;
}
