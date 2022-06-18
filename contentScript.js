(() => {
  let userProfileUrl;

  chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    const { type, profileUrl } = obj;
    if (profileUrl) {
      userProfileUrl = profileUrl;
    }

    console.log('CONTENT SCRIPT');

    if (type === 'NEW') {
      fetchUserData();
    }
  });

  const fetchUserData = async () => {
    const profileOwnersName = document.querySelector('h1').innerHTML;
    const profilePicture = document.querySelector('.pv-top-card-profile-picture__image').src;
    const location = document.querySelector('.text-body-small').innerHTML;
    const about = document.querySelector('.pv-shared-text-with-see-more').innerHTML;

    const data = {
      name: profileOwnersName,
      picture: profilePicture ? profilePicture : 'no profile pic available',
      url: userProfileUrl ? userProfileUrl : 'couldnt fetch user profile url, please try again.',
      location: location ? location : 'no location available',
      about: about ? about : 'no about found for this user',
    };

    setProfileInfoToStorage(data);
  };

  const setProfileInfoToStorage = async (data) => {
    chrome.storage.sync.set({
      [userProfileUrl]: JSON.stringify([data]),
    });
  };
})();
