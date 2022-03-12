export const getLatestData = (inArray: any, searchField: string) => {
  let latestData: any = null;
  for (const item of inArray) {
      if (latestData == null || item[searchField] > latestData[searchField]) {
          latestData = item;
      }
  }
  return latestData;
};

export const getISODate = (dt: any) => {
  const dtDay = '0' + (dt.getDate());
  const dtMonth = '0' + (dt.getMonth() + 1);    // January = 0

 // convert today's date to ISO format yyyy-mm-dd
 return dt.getFullYear() + '-' +
   dtMonth.substr(dtMonth.length - 2) + '-' +
   dtDay.substr(dtDay.length - 2);
};

export const getTime24hoursFormat = (dt: any) => {
 // convert hour, minute to 2 digits with leading zero
 const hh = '0' + dt.getHours();
 const mm = '0' + dt.getMinutes();
 return hh.substr(hh.length - 2) + ':' + mm.substr(mm.length - 2);
};
