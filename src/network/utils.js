export const fetchData = async (url, method = 'GET', body = null) => {
  try {
    let options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add the body if it's a POST or PUT request
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
  } finally {
    console.log(`${method} request completed`);
  }

  return []; // Return an empty array as a fallback in case of failure
};
