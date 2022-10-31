document.querySelector('#submit').addEventListener('click', () => {
  const input = document.querySelector('#text-input');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var results = document.querySelectorAll('.result-photo');
          if (results.length > 0) {
            for (var result of results) {
              result.remove();
            }
          }
      const responseData = JSON.parse(xhttp.responseText);
      console.log(responseData);
      const photos = responseData.photos;
      for (let photo of photos) {
        const jsonAlt = JSON.stringify(photo.alt);
        const alt = jsonAlt.replace(/['"]+/g, '');

        const jsonPhotographer = JSON.stringify(photo.photographer);
        const photographer = jsonPhotographer.replace(/['"]+/g, '');

        const jsonPhotographerUrl = JSON.stringify(photo.photographer_url);
        const photographerUrl = jsonPhotographerUrl.replace(/['"]+/g, '');

        const jsonUrl = JSON.stringify(photo.src.tiny);
        const url = jsonUrl.replace(/['"]+/g, '');

        console.log(jsonAlt);
        console.log(jsonPhotographer);
        console.log(jsonPhotographerUrl);
        console.log(jsonUrl);
        const resultPhoto = document.createElement('div');
        resultPhoto.classList.add('result-photo')
        resultPhoto.innerHTML = `
          <img src="${url}" alt="${alt}">
          <a href="${photographerUrl}">${photographer}</a>
        `;
        document.querySelector('#photo-container').append(resultPhoto);
      }
    }
  };
  xhttp.open("GET", `https://api.pexels.com/v1/search?query=${input.value}`, true);
  xhttp.setRequestHeader('Authorization', '563492ad6f917000010000018a2fba1a672f49d0a728d6bee9a32735');
  xhttp.send();
});

