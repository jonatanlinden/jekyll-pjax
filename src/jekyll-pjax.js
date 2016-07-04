export default function pjax(contentSelector) {
//const MAIN_CONTENT_SELECTOR = 'div.page-content';
  let find = (selector, context) => {
    return (context || document).querySelector(selector);
  };

  let load = (url) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'document';

    xhr.onload = function() {
      var newContent = find(contentSelector, this.response);
      var newTitle = find('title', this.response).textContent;
      var currentContent = find(contentSelector);

      find('title').textContent = newTitle;

      currentContent.parentNode.replaceChild(newContent, currentContent);
      //find('.chapter').classList.add('animated', 'fadeInUpBig');
      window.scrollTo(0, 0);
    };

    xhr.send();
  };

  find('body').addEventListener('click', (e) => {

    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      load(e.target.href);
      history.pushState(null, null, e.target.href);
    }
  }, false);
  // only works if pushstate always is called with state null
  window.addEventListener('load', function() {
    setTimeout(function() {
      window.addEventListener('popstate', function() {
        load(window.location.href);
      }, false);
    }, 0);
  });
}
