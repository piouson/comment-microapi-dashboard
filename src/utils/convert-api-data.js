const convertAPIData = (data) => {
  if (data.length && data.constructor === Array) {
    return data.map(
      ({ msAdminId, ...rest }) => ({ id: msAdminId, ...rest })
    );
  } else if (data.msAdminId && data === Object(data)) {
    return ({ msAdminId, ...data }) => ({ id: msAdminId, ...data });
  }
  return data;
}

export default convertAPIData;
