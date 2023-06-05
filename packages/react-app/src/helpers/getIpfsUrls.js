export const getIpfsUrls = async () => {
    const configResponse = await fetch("/ipfs-urls.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const urls = await configResponse.json();
    return urls
  };